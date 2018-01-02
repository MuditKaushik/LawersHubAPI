import { Observable, Observer } from '@reactivex/rxjs';
import { IResult } from 'mssql';
import { ClientsRepository } from './clientsRepository';
import { IClientFacade } from './IClientFacade';

export class ClientFacade extends ClientsRepository implements IClientFacade {
    constructor() {
        super();
    }
    getClientsListFacade(): Observable<IResult<any>> {
        return Observable.create((observer: Observer<IResult<any>>) => {
            this.getPrivateClients().subscribe((result) => {
                observer.next(result);
            }, (err) => {
                // log error;
                observer.error(err);
            }, () => {
                observer.complete();
            });
        });
    }
}
