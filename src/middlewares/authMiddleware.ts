import { Observable, Observer } from '@reactivex/rxjs';
import * as config from 'config';
import { Application, NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status-codes';
import { JsonWebTokenError, sign, SignOptions, verify } from 'jsonwebtoken';
import { IIdentityModel, ISignupModel, IAuthUser, IResponseBody, SendResponse } from '../models/v1_models';

export class AuthMiddlewares {
    tokenConfig: any;
    constructor() {
        this.tokenConfig = config.get<any>('jwt');
    }
    protected validateToken(req: Request, res: Response, next: NextFunction): void {
        let bearerToken = (!req.header('auth')) ? <string>req.header('authorization') : <string>req.header('auth');
        let tokenConfig = config.get<any>('jwt');
        let userId = req.params.userId;
        if (bearerToken !== undefined) {
            let splitBearerToken = bearerToken.split(' ');
            if (splitBearerToken[1] !== undefined) {
                verify(splitBearerToken[1], tokenConfig.secretKey as string, (err, decode) => {
                    if (!err) {
                        let identity = decode as IIdentityModel;
                        if (!identity || !identity.userid || !identity.userName
                            || !identity.email || !identity.isActive ||
                            (identity.userid !== userId)) {
                            return res.sendStatus(httpStatus.UNAUTHORIZED).send('Invaild user access.');
                        } else {
                            next();
                        }
                    } else {
                        return res.sendStatus(httpStatus.UNAUTHORIZED).send(err.message);
                    }
                });
            } else {
                next(httpStatus.UNAUTHORIZED);
                res.sendStatus(httpStatus.UNAUTHORIZED);
            }
        } else {
            res.sendStatus(httpStatus.UNAUTHORIZED);
        }
    }
    protected generateAccessToken(user: IAuthUser): Observable<IResponseBody<IIdentityModel>> {
        return Observable.create((observer: Observer<IResponseBody<IIdentityModel>>) => {
            let userIdentity: IIdentityModel = {
                userid: user.userid,
                email: user.email,
                userName: user.username,
                fullName: `${user.firstName} ${user.middleName} ${user.lastName}`,
                isActive: true,
                access_token: ''
            };
            sign(userIdentity, this.tokenConfig.secretKey as string, (err: Error, token: string) => {
                if (!err) {
                    userIdentity.access_token = `bearer ${token}`;
                    observer.next(SendResponse<IIdentityModel>(userIdentity, true));
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    protected decodeAccessToken(token: string): Observable<IIdentityModel> {
        return Observable.create((observer: Observer<IIdentityModel>) => {
            verify(token, this.tokenConfig.secretKey as string, (err: JsonWebTokenError, decode: string | object) => {
                if (!err) {
                    observer.next(decode as IIdentityModel);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
}
