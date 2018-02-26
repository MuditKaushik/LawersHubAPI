import { Observable, Observer } from '@reactivex/rxjs';
import { IResult } from 'mssql';
import { IUserClient, IResponseBody, SendResponse, ResponseMessage } from '../../models/v1_models';
import { ClientsRepository } from './clientsRepository';
import { IClientFacade } from './IClientFacade';

export class ClientFacade extends ClientsRepository implements IClientFacade {
    constructor() {
        super();
    }
    getClientsListFacade(userid: string, isprivate: boolean): Observable<IResponseBody<Array<IUserClient>>> {
        return Observable.create((observer: Observer<IResponseBody<Array<IUserClient>>>) => {
            let getClientObservable: Observable<IResult<any>> = (typeof isprivate === 'undefined') ? this.getAllClients(userid) : this.getClients(userid, isprivate);
            getClientObservable.subscribe((result: IResult<any>) => {
                if (result.recordsets[0].length > 0) {
                    observer.next(SendResponse<Array<IUserClient>>(result.recordsets[0], true));
                } else {
                    observer.next(SendResponse<Array<IUserClient>>([], true, ResponseMessage.NOT_FOUND));
                }
            }, (err) => {
                observer.error(err);
            }, () => {
                observer.complete();
            });
        });
    }
    addClientFacade(client: IUserClient, userid: string): Observable<IResponseBody<boolean>> {
        return Observable.create((observer: Observer<IResponseBody<boolean>>) => {
            client.userid = userid;
            client.country = 'India';
            client.purpose = 1;
            this.addClient(client).subscribe((result: IResult<any>) => {
                if (result.output.created) {
                    observer.next(SendResponse<boolean>(true, true));
                } else {
                    observer.next(SendResponse<boolean>(false, false, ResponseMessage.NOT_CREATED));
                }
            }, (err: any) => {
                observer.error(err);
            }, () => {
                observer.complete();
            });
        });
    }
}
