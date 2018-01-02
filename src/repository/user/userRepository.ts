import { Observable, Observer } from '@reactivex/rxjs';
import { ConnectionPool, IRecordSet, IResult, pool, Request } from 'mssql';
import { Connect } from '../db_context';

export class UserRepository extends Connect {
    constructor() {
        super();
    }
    getUser(username: string, password: string): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.connect_DB().subscribe((connection: ConnectionPool) => {
                let promise = new Request(connection).query(`SELECT * FROM PrimaryUser WHERE UserName = '${username}' AND Password = '${password}'`);
                promise.then((result: IResult<any>) => {
                    observer.next(result);
                    connection.close();
                    observer.complete();
                }).catch((err) => {
                    // log query errors;
                    connection.close();
                    observer.error(err);
                    observer.complete();
                });
            });
        });
    }
    getAllUsers(): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.connect_DB().subscribe((connection: ConnectionPool) => {
                let query: Promise<IResult<any>> = new Request(connection).query(`SELECT * FROM PrimaryUser`);
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
}
