import { Observable, Observer } from '@reactivex/rxjs';
import { ConnectionPool, IResult, Request, IProcedureResult, TYPES } from 'mssql';
import { Connect } from '../db_context';
import { ISignupModel } from '../../models/v1_models';

export class UserRepository extends Connect {
    constructor() {
        super();
    }
    getUser(username: string, password: string): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.connect_DB().subscribe((connection: ConnectionPool) => {
                let procedure = new Request(connection)
                    .input('username', TYPES.NVarChar, username)
                    .input('password', TYPES.NVarChar, password)
                    .execute('sp_getAuthuser');
                Observable.fromPromise(procedure).subscribe((result: IProcedureResult<any>) => {
                    observer.next(result);
                }, (err: any) => {
                    observer.error(err);
                }, () => {
                    connection.close();
                    observer.complete();
                });
            });
        });
    }
    getAllUsers(): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.connect_DB().subscribe((connection: ConnectionPool) => {
                let query: Promise<IResult<any>> = new Request(connection).query(`SELECT * FROM user_client`);
                let queryObservable = Observable.fromPromise(query);
                queryObservable.subscribe((result: IResult<any>) => {
                    observer.next(result);
                }, (err) => {
                    observer.error(err);
                }, () => {
                    connection.close();
                    observer.complete();
                });
            });
        });
    }
    adduser(addUser: ISignupModel): Observable<number> {
        return Observable.create((observer: Observer<number>) => {
            this.connect_DB().subscribe((connection: ConnectionPool) => {
                let procedure = new Request(connection)
                    .input('firstname', TYPES.NVarChar, addUser.firstName)
                    .input('middlename', TYPES.NVarChar, addUser.middleName)
                    .input('lastname', TYPES.NVarChar, addUser.lastName)
                    .input('phone', TYPES.NVarChar, addUser.phone)
                    .input('email', TYPES.NVarChar, addUser.email)
                    .input('username', TYPES.NVarChar, addUser.username)
                    .input('password', TYPES.NVarChar, addUser.password)
                    .execute('sp_addAuthuser');
                Observable.fromPromise(procedure).subscribe((result: IProcedureResult<any>) => {
                    observer.next(result.returnValue);
                }, (err: any) => {
                    observer.error(err);
                }, () => {
                    connection.close();
                    observer.complete();
                });
            });
        });
    }
}
