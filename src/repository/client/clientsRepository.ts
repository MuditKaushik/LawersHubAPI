import { Observable, Observer } from '@reactivex/rxjs';
import { ConnectionPool, IResult, Request, TYPES, IProcedureResult } from 'mssql';
import { Connect } from '../db_context';
import { IUserClient } from '../../models/v1_models';

export class ClientsRepository extends Connect {
    constructor() {
        super();
    }
    getClients(userid: string, isPrivate?: boolean): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.connect_DB().subscribe((connection: ConnectionPool) => {
                let procedure = new Request(connection)
                    .input('userid', TYPES.NVarChar, userid)
                    .input('clientType', TYPES.Bit, (isPrivate !== null) ? isPrivate : true)
                    .execute('sp_getclients');
                Observable.fromPromise(procedure).subscribe((result: IProcedureResult<any>) => {
                    observer.next(result);
                }, (err: any) => {
                    observer.error(err);
                }, () => {
                    connection.close();
                    observer.complete();
                });
            });
        });
    }
    addClient(client: IUserClient): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.connect_DB().subscribe((connection: ConnectionPool) => {
                let procedure = new Request(connection)
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
                    .input('purpose', TYPES.Int, client.purpose)
                    .input('isprivate', TYPES.Bit, client.isprivate)
                    .input('about', TYPES.NVarChar, client.about)
                    .input('created', TYPES.NVarChar, client.userid)
                    .execute('sp_addClient');
                Observable.fromPromise(procedure).subscribe((result: IProcedureResult<any>) => {
                    observer.next(result);
                }, (err: any) => {
                    observer.error(err);
                }, () => {
                    connection.close();
                    observer.complete();
                });
            });
        });
    }
}
