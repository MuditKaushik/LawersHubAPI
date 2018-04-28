import { Observable, Observer } from '@reactivex/rxjs';
import { ConnectionPool, IProcedureResult, IResult, Request, TYPES } from 'mssql';
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
}
