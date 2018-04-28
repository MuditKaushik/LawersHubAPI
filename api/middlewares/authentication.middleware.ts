import { Observable, Observer } from '@reactivex/rxjs';
import * as config from 'config';
import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status-codes';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { IIdentityModel, IUserModel } from '../models/specimen';

export function decodeToken(token: string): Observable<IIdentityModel> {
    let secretKeys: any = config.get<any>('jwt');
    return Observable.create((observer: Observer<IIdentityModel>) => {
        verify(token, secretKeys.secretKey, (err: any, decode: IIdentityModel) => {
            if (!err) {
                observer.next(decode);
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
            expiresIn: '1900',
            jwtid: userIdentity.userid,
            keyid: userIdentity.userid,
        };
        sign(user, secretKeys.secretKey, tokenOptions, (err: Error, token: string) => {
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
    let bearerToken: string = ((req.header('authorization') != null) ? req.header('authorization') : req.header('auth')) as string;
    if (bearerToken != null && bearerToken.split(' ')[1] != null) {
        decodeToken(bearerToken).subscribe((userInfo: IIdentityModel) => {
            if (userInfo.isActive && userInfo.access_token != null) {
                next();
            } else {
                return res.status(httpStatus.UNAUTHORIZED).send('Unauthorise access.');
            }
        });
    } else {
        return res.status(401).type('json').send('Unauthorize access.');
    }
}
