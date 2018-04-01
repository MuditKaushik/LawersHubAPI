import { Observable, Observer } from '@reactivex/rxjs';
import { ConnectionPool, IResult, Request, TYPES, IProcedureResult, ConnectionError } from 'mssql';
import { Connect } from '../db_context';
import { IUserClient } from '../../models/v1_models';

export class ClientsRepository extends Connect {
    constructor() {
        super();
    }
    getClients(userid: string, isPrivate: boolean): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.connect_DB().subscribe((connection: ConnectionPool) => {
                let procedure = new Request(connection)
                    .input('userid', TYPES.NVarChar, userid)
                    .input('clientType', TYPES.Bit, isPrivate)
                    .execute('sp_getclients', (err: any, record: IProcedureResult<any>, value: any) => {
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
    getAllClients(userid: string): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.connect_DB().subscribe((connection: ConnectionPool) => {
                let request = new Request(connection)
                    .query(`SELECT * FROM [dbo].user_client as [client] WHERE [client].userid = '${userid}'`);
                Observable.fromPromise(request).subscribe((result: IResult<any>) => {
                    observer.next(result);
                }, (err: ConnectionError) => {
                    observer.error(err.message);
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
                    .input('email', TYPES.NVarChar, client.email)
                    .input('purpose', TYPES.Int, client.purpose)
                    .input('isprivate', TYPES.Bit, client.isprivate)
                    .input('about', TYPES.NVarChar, client.about)
                    .output('created', TYPES.Bit)
                    .execute('sp_addClient', (err: any, record: IProcedureResult<any>, value: any) => {
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
    removeClient(clientId: string, userId: string): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.connect_DB().subscribe((connection: ConnectionPool) => {
                let request = new Request(connection)
                    .query(`DELETE FROM [dbo].user_client WHERE clientid = '${clientId}' AND userid='${userId}'`,
                        (err: any, record: IResult<any>) => {
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
}
