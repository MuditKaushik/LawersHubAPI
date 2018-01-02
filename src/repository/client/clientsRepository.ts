import { Observable, Observer } from '@reactivex/rxjs';
import { ConnectionPool, IResult } from 'mssql';
import { Connect } from '../db_context';

export class ClientsRepository extends Connect {
    constructor() {
        super();
    }
    getPrivateClients(): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.connect_DB().subscribe((connection: ConnectionPool) => {
            });
        });
    }
}
