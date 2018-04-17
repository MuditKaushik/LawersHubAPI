import { ConnectionPool, ConnectionError, config } from 'mssql';
import { Observable, Observer } from '@reactivex/rxjs';
import * as conf from 'config';

export class ConnectDatabase {
    constructor() { }
    Connect(): Observable<ConnectionPool> {
        let dbConfig: config = conf.get('dbconfig');
        return Observable.fromPromise(new ConnectionPool(dbConfig).connect());
    }
}