import { Observable } from '@reactivex/rxjs';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IResult } from 'mssql';
import { IClientModel, IPayload, SendPayload } from '../../models/specimen';
import { FailureMessages } from '../../util/messages.enum';
import { ClientDBStore } from './clientDbStore';
import { IClientStore } from '../storeInterface';

@injectable()
export class ClientStore implements IClientStore {
    private get dbStore() {
        return new ClientDBStore();
    }
    addclient(client: IClientModel): Observable<IPayload> {
        return this.dbStore.addClient(client).map((clients: IResult<Array<IClientModel>>) => {
            if (clients.recordset[0].length > 0) {
                return SendPayload(true, clients.recordset[0]);
            }
            return SendPayload(false, [], FailureMessages.NO_RESULT_FOUND);
        });
    }
    getclients(userid: string, type: 'true' | 'false'): Observable<IPayload> {
        let clientType: boolean = (type === 'true') ? true : false;
        return this.dbStore.getClients(userid, clientType).map((clients: IResult<Array<IClientModel>>) => {
            if (clients.recordsets[0].length > 0) {
                return SendPayload(true, clients.recordsets[0]);
            }
            return SendPayload(false, [], FailureMessages.NO_RESULT_FOUND);
        });
    }
}
