import { Observable, Observer } from '@reactivex/rxjs';
import { ConnectionPool, IResult, Promise } from 'mssql';
import { Connect } from '../db_context';

export class ClientsRepository extends Connect {
    constructor() {
        super();
    }
    getPrivateClients(): Observable<IResult<any>> {
        let queryPromise = this._db.query`SELECT * FROM PrimaryUser`;
        return Observable.fromPromise(queryPromise);
    }
}
