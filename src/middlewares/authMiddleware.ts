import { Observable, Observer } from '@reactivex/rxjs';
import * as config from 'config';
import { Application, NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status-codes';
import { JsonWebTokenError, sign, SignOptions, verify } from 'jsonwebtoken';
import { IIdentityModel } from '../models/v1_models';

export class AuthMiddlewares {
    tokenConfig: any;
    constructor() {
        this.tokenConfig = config.get<any>('jwt');
    }
    protected validateToken(req: Request, res: Response, next: NextFunction): void {
        let bearerToken = req.headers.Authorization as string;
        if (bearerToken !== undefined) {
            let splitBearerToken = bearerToken.split(' ');
            if (splitBearerToken[1] !== undefined) {
                this.decodeAccessToken(splitBearerToken[1]).subscribe((decode: IIdentityModel) => {
                    if (!decode || !decode.Id || !decode.userName || !decode.email || !decode.isActive) {
                        return res.sendStatus(httpStatus.UNAUTHORIZED);
                    }
                    next();
                });
            } else {
                next(httpStatus.UNAUTHORIZED);
                res.sendStatus(httpStatus.FORBIDDEN);
            }
        } else {
            res.sendStatus(httpStatus.FORBIDDEN);
        }
    }
    protected generateAccessToken(user: IIdentityModel): Observable<string | Error> {
        return Observable.create((observer: Observer<string | Error>) => {
            sign(user, this.tokenConfig.secretKey as string, (err: Error, token: string) => {
                if (!err) {
                    observer.next(token as string);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
    private decodeAccessToken(token: string): Observable<IIdentityModel> {
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
