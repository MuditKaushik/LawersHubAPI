import { Observable, Observer } from '@reactivex/rxjs';
import * as config from 'config';
import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

export function decodeToken(token: string): Observable<any> {
    let secretKeys: any = config.get<any>('jwt');
    return Observable.create((observer: Observer<any>) => {
        verify(token, secretKeys.secretKey, (err: any, decode: any) => {
            if (!err) {
                observer.next(decode);
            } else {
                observer.error(err);
            }
            observer.complete();
        });
    });
}
export function GenerateUserToken(user: any): Observable<any> {
    let secretKeys: any = config.get<any>('jwt');
    return Observable.create((observer: Observer<any>) => {
        sign(user, secretKeys.secretKey, (err: Error, token: string) => {
            if (!err) {
                observer.next(token);
            } else {
                observer.error(err);
            }
            observer.complete();
        });
    });
}
export function AuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    let bearerToken: string = <string>((req.header('authorization') != null) ? req.header('authorization') : req.header('auth'));
    if (bearerToken != null && bearerToken.split(' ')[1] != null) {
        decodeToken(bearerToken).subscribe((userInfo: any) => {
            /**
             * TODO: validate user fields.
             */
        });
    } else {
        return res.status(401).type('json').send('Unauthorize access.')
    }
}
