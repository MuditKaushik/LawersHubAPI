import { Observable, Observer } from '@reactivex/rxjs';
import { ConnectionPool, IProcedureResult, IResult, TYPES } from 'mssql';
import { IClientModel } from '../../models/specimen';
import { ConnectDatabase } from '../dbStore/dbConnect';

export class ClientDBStore {
    private get _db(): ConnectDatabase {
        return new ConnectDatabase();
    }
    constructor() {
    }
    addClient(client: IClientModel): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this._db.Connect().subscribe((connection: ConnectionPool) => {
                connection.request()
                    .input('userid', TYPES.NVarChar, client.userid)
                    .input('firstName', TYPES.NVarChar, client.firstName)
                    .input('middleName', TYPES.NVarChar, client.middleName)
                    .input('lastName', TYPES.NVarChar, client.lastName)
                    .input('address1', TYPES.NVarChar, client.address1)
                    .input('address2', TYPES.NVarChar, client.address2)
                    .input('country', TYPES.NVarChar, client.country)
                    .input('state', TYPES.NVarChar, client.state)
                    .input('district', TYPES.NVarChar, client.district)
                    .input('city', TYPES.NVarChar, client.city)
                    .input('email', TYPES.NVarChar, client.email)
                    .input('purpose', TYPES.Int, client.purpose)
                    .input('isprivate', TYPES.Bit, client.isprivate)
                    .input('about', TYPES.NVarChar, client.about)
                    .execute('sp_addClient', (err, record: IProcedureResult<Array<any>>) => {
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
    getClients(userId: string, type: boolean): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this._db.Connect().subscribe((connection: ConnectionPool) => {
                connection.request()
                    .input('userid', TYPES.NVarChar, userId)
                    .input('clientType', TYPES.Bit, type)
                    .execute('sp_getclients', (err: any, recordSet: IProcedureResult<any>) => {
                        if (!err) {
                            observer.next(recordSet);
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
