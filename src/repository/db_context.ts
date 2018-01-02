import { Observable, Observer } from '@reactivex/rxjs';
import * as configuration from 'config';
import { config, ConnectionPool, IPool } from 'mssql';

export class Connect {
    constructor() {
    }
    protected connect_DB(): Observable<ConnectionPool> {
        let dbConfig: config = configuration.get('dbconfig');
        return Observable.fromPromise(new ConnectionPool(dbConfig).connect());
    }
}
