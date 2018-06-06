import { Observable, Observer } from '@reactivex/rxjs';
import { ConnectionPool, IProcedureResult, IResult, Request, TYPES } from 'mssql';
import { IUserModel } from '../../models/specimen';
import { ConnectDatabase } from '../dbStore/dbConnect';
export class UserDBStore extends ConnectDatabase {
    constructor() {
        super();
    }
    getDbUser(username: string, password: string): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.Connect().subscribe((connection: ConnectionPool) => {
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
            this.Connect().subscribe((connection: ConnectionPool) => {
                connection.request()
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
                            observer.next(recordset);
                        } else {
                            observer.error(err);
                        }
                        connection.close();
                        observer.complete();
                    });
            });
        });
    }
}
