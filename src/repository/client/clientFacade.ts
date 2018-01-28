import { Observable, Observer } from '@reactivex/rxjs';
import { IResult } from 'mssql';
import { IUserClient } from '../../models/v1_models';
import { ClientsRepository } from './clientsRepository';
import { IClientFacade } from './IClientFacade';

export class ClientFacade extends ClientsRepository implements IClientFacade {
    constructor() {
        super();
    }
    getClientsListFacade(userid: string, isprivate?: boolean): Observable<Array<IUserClient>> {
        return Observable.create((observer: Observer<Array<IUserClient>>) => {
            this.getClients(userid, isprivate).subscribe((result: IResult<any>) => {
                observer.next(result.recordsets[0] as Array<IUserClient>);
            }, (err) => {
                observer.error(err);
            }, () => {
                observer.complete();
            });
        });
    }
}
