import { Observable } from '@reactivex/rxjs';
import * as conf from 'config';
import { injectable } from 'inversify';
import { config, ConnectionPool, Transaction } from 'mssql';
import 'reflect-metadata';
import { IDBConnect } from '../storeInterface';

@injectable()
export class ConnectDatabase implements IDBConnect {
    Connect(): Observable<ConnectionPool> {
        let dbConfig: config = conf.get('dbconfig');
        return Observable.fromPromise(new ConnectionPool(dbConfig).connect());
    }
    TConnect(): Observable<Transaction> {
        return this.Connect().map((connection: ConnectionPool) => {
            return new Transaction(connection);
        });
    }
}
