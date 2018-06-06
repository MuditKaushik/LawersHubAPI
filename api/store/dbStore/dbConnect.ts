import { Observable, Observer } from '@reactivex/rxjs';
import * as conf from 'config';
import { injectable } from 'inversify';
import { config, ConnectionError, ConnectionPool } from 'mssql';

export class ConnectDatabase {
    constructor() { }
    Connect(): Observable<ConnectionPool> {
        let dbConfig: config = conf.get('dbconfig');
        return Observable.fromPromise(new ConnectionPool(dbConfig).connect());
    }
}
