import { Observable } from '@reactivex/rxjs';
import { ConnectionPool, Transaction } from 'mssql';

export interface IDBConnect {
    Connect(): Observable<ConnectionPool>;
    TConnect(): Observable<Transaction>;
}
