import { Observable, Observer } from '@reactivex/rxjs';
import { IResult } from 'mssql';
import { IUserClient, IResponseBody, SendResponse, ResponseMessage } from '../../models/v1_models';
import { ClientsRepository } from './clientsRepository';
import { IClientFacade } from './IClientFacade';

export class ClientFacade extends ClientsRepository implements IClientFacade {
    constructor() {
        super();
    }
    getClientsListFacade(userid: string, isprivate: boolean | undefined | 'undefined'): Observable<IResponseBody<Array<IUserClient>>> {
        let getClientObservable: Observable<IResult<any>> = (isprivate == null || isprivate == 'undefined') ?
            this.getAllClients(userid) :
            this.getClients(userid, isprivate);
        return getClientObservable.map((result: IResult<any>) => {
            if (result.recordset.length > 0) {
                return SendResponse<Array<IUserClient>>(result.recordset[0], true);
            } else {
                return SendResponse<Array<IUserClient>>([], false, ResponseMessage.NOT_FOUND);
            }
        }).catch(err => Observable.throw(err));
    }
    addClientFacade(client: IUserClient, userid: string): Observable<IResponseBody<boolean>> {
        client.userid = userid;
        client.country = 'India';
        client.purpose = 1;
        return this.addClient(client).map((result: IResult<any>) => {
            if (result.output.created) {
                return SendResponse<boolean>(true, true);
            } else {
                return SendResponse<boolean>(false, false, ResponseMessage.NOT_CREATED);
            }
        });
    }
    removeClientFacade(clientId: string, userId: string): Observable<IResponseBody<boolean>> {
        return this.removeClient(clientId, userId).map((result: IResult<any>) => {
            if (result.recordset.length > 0) {
                return SendResponse<boolean>(result.recordset[0], true, '');
            }
            return SendResponse<boolean>(false, false, ResponseMessage.NOT_DELETED);
        });
    }
    errorHandler(err: Error): Observable<any> {
        throw SendResponse<string>('null', false, err.message);
    }
}
