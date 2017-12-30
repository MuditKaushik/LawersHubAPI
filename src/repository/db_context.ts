import { Observable, Observer } from '@reactivex/rxjs';
import * as configuration from 'config';
import { config, ConnectionError, ConnectionPool, Request } from 'mssql';

export class Connect {
    _db: ConnectionPool;
    constructor() {
        this.initialize_connection().subscribe((response: ConnectionPool) => {
            this._db = response;
        });
    }
    private initialize_connection(): Observable<ConnectionPool> {
        let dbConfig: config = configuration.get('dbconfig');
        return Observable.fromPromise(new ConnectionPool(dbConfig).connect());
    }
}
