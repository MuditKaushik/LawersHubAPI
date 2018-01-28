import { Observable, Observer } from '@reactivex/rxjs';
import { ConnectionPool, IResult, Request, RequestError } from 'mssql';
import { Connect } from '../repository/db_context';
import { Fetch } from './scripts/utility';

export class Initialize_DB extends Connect {
    constructor() {
        super();
    }
    Db_Exists(): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            this.connect_DB().subscribe((connection: ConnectionPool) => {
                let request = new Request(connection).query(`SELECT * FROM sys.databases as [sysdb] WHERE [sysdb].name = 'lawyershub_db'`);
                let request$ = Observable.fromPromise(request);
                request$.subscribe((result: IResult<any>) => {
                    if (result.recordsets.length) {
                        observer.next(true);
                    } else {
                        observer.next(false);
                    }
                }, (err: RequestError) => {
                    observer.error(err.message);
                }, () => {
                    connection.close();
                    observer.complete();
                });
            });
        });
    }
}
