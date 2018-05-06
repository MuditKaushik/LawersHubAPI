import { Observable, Observer, Subject } from '@reactivex/rxjs';
import * as config from 'config';
import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status-codes';
import { sign, SignOptions, TokenExpiredError, verify, VerifyOptions } from 'jsonwebtoken';
import { IIdentityModel, IUserModel } from '../models/specimen';
import { setIdentity } from '../util/identity';
import { FailureMessages } from '../util/messages.enum';

function IsBearerTokenNotNull(token: string): boolean {
    return (token != null && token !== 'undefined') ?
        (token.split(' ')[1] != null) ? true : false
        : false;
}
export function decodeToken(token: string): Observable<IIdentityModel> {
    let secretKeys: any = config.get<any>('jwt');
    let verifyOptions: VerifyOptions = {};
    return Observable.create((observer: Observer<IIdentityModel>) => {
        verify(token, secretKeys.secretKey, (err: any, decode: object) => {
            if (!err) {
                let identity: IIdentityModel = decode as IIdentityModel;
                setIdentity(identity);
                observer.next(identity);
            } else {
                observer.error(err);
            }
            observer.complete();
        });
    });
}
export function GenerateUserToken(user: IUserModel): Observable<IIdentityModel> {
    let secretKeys: any = config.get<any>('jwt');
    return Observable.create((observer: Observer<IIdentityModel>) => {
        let userIdentity: IIdentityModel = {
            access_token: '',
            email: user.email,
            fullname: `${user.firstName} ${user.middleName} ${user.lastName}`,
            isActive: true,
            userid: user.userid,
            username: user.username,
        };
        let tokenOptions: SignOptions = {
            expiresIn: '1h',
            jwtid: userIdentity.userid,
            keyid: userIdentity.userid,
        };
        sign(userIdentity, secretKeys.secretKey, tokenOptions, (err: Error, token: string) => {
            if (!err) {
                userIdentity.access_token = `bearer ${token}`;
                observer.next(userIdentity);
            } else {
                observer.error(err);
            }
            observer.complete();
        });
    });
}
export function AuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    let bearerToken: string = ((req.headers.authorization != null) ?
        req.headers.authorization :
        req.header('auth')) as string;
    if (IsBearerTokenNotNull(bearerToken)) {
        let token: string = bearerToken.split(' ')[1];
        decodeToken(token).subscribe((userInfo: IIdentityModel) => {
            if (userInfo.isActive && userInfo.userid != null) {
                next();
            } else {
                return res.status(httpStatus.UNAUTHORIZED).send(FailureMessages.USER_INACTIVE);
            }
        }, (err: any) => {
            if (err instanceof TokenExpiredError) {
                return res.status(httpStatus.UNAUTHORIZED).send(FailureMessages.TOKEN_EXPIRE);
            } else {
                return res.status(httpStatus.UNAUTHORIZED).send(err);
            }
        });
    } else {
        return res.status(httpStatus.NON_AUTHORITATIVE_INFORMATION).send(FailureMessages.TOKEN_REQUIRED);
    }
}
