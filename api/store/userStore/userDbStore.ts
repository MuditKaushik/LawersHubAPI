import { Request, IResult, ConnectionPool } from 'mssql';
import { Observable, Observer } from '@reactivex/rxjs';
import { ConnectDatabase } from '../dbStore/dbConnect';

export class UserDBStore extends ConnectDatabase {
    constructor() {
        super();
    }
    getDbUser(): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.Connect().subscribe((connection: ConnectionPool) => {
                connection.request().query(``, (err: Error, response: IResult<any>) => {
                    if (!err) {
                        observer.next(response);
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