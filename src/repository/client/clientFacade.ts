import { Observable, Observer } from '@reactivex/rxjs';
import { IResult } from 'mssql';
import { IUserClient } from '../../models/v1_models';
import { ClientsRepository } from './clientsRepository';
import { IClientFacade } from './IClientFacade';

export class ClientFacade extends ClientsRepository implements IClientFacade {
    constructor() {
        super();
    }
    getClientsListFacade(userid: string, isprivate: boolean): Observable<Array<IUserClient>> {
        return Observable.create((observer: Observer<Array<IUserClient>>) => {
            switch (typeof isprivate) {
                case 'undefined':
                    this.getAllClients(userid).subscribe((result: IResult<any>) => {
                        observer.next(result.recordsets[0]);
                    }, (err: any) => {
                        observer.error(err);
                    }, () => {
                        observer.complete();
                    });
                    break;
                default:
                    this.getClients(userid, isprivate).subscribe((result: IResult<any>) => {
                        observer.next(result.recordsets[0] as Array<IUserClient>);
                    }, (err) => {
                        observer.error(err);
                    }, () => {
                        observer.complete();
                    });
                    break;
            }
        });
    }
    addClientFacade(client: IUserClient, userid: string): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            client.userid = userid;
            client.country = 'India';
            client.purpose = 1;
            this.addClient(client).subscribe((result: IResult<any>) => {
                observer.next((result.recordsets.length > 0) ? true : false);
            }, (err: any) => {
                observer.error(err);
            }, () => {
                observer.complete();
            });
        });
    }
}
