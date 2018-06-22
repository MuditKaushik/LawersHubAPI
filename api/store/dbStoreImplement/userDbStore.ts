import { Observable, Observer } from '@reactivex/rxjs';
import { inject, injectable } from 'inversify';
import { IProcedureResult, IResult, Request, TYPES } from 'mssql';
import 'reflect-metadata';
import { IUserModel } from '../../models';
import { TypeObject } from '../../util/store_Types';
import { IDBConnect } from '../storeInterface';

@injectable()
export class UserDBStore {
    @inject(TypeObject.dbConnect) dbConnect: IDBConnect;
    getDbUser(username: string, password: string): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.dbConnect.Connect().subscribe((connection) => {
                connection.request()
                    .input('username', TYPES.NVarChar, username)
                    .input('password', TYPES.NVarChar, password)
                    .execute('sp_getAuthuser', (err, record: IProcedureResult<any>) => {
                        if (!err) {
                            observer.next(record);
                        } else {
                            observer.error(err);
                        }
                        connection.close();
                        observer.complete();
                    });
            });
        });
    }
    addDbUser(user: IUserModel): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.dbConnect.TConnect().subscribe((trans) => {
                trans.begin().then(() => {
                    new Request(trans)
                        .input('firstname', TYPES.NVarChar, user.firstName)
                        .input('middlename', TYPES.NVarChar, user.middleName)
                        .input('lastname', TYPES.NVarChar, user.lastName)
                        .input('phone', TYPES.NVarChar, user.phone)
                        .input('email', TYPES.NVarChar, user.email)
                        .input('username', TYPES.NVarChar, user.username)
                        .input('password', TYPES.NVarChar, user.password)
                        .output('iscreated', TYPES.Bit)
                        .execute('sp_addAuthuser', (err, recordset: IProcedureResult<any>, value) => {
                            if (!err) {
                                trans.commit();
                                observer.next(recordset);
                            } else {
                                trans.rollback();
                                observer.error(err);
                            }
                            observer.complete();
                        });
                }).catch((err) => {
                    trans.rollback();
                    observer.error(err);
                    observer.complete();
                });
            });
        });
    }
}
