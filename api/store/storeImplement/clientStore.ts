import { Observable } from '@reactivex/rxjs';
import { inject, injectable } from 'inversify';
import { IResult } from 'mssql';
import 'reflect-metadata';
import { IClientModel, IPayload, SendPayload } from '../../models';
import { FailureMessages } from '../../util/messages.enum';
import { TypeObject } from '../../util/store_Types';
import { ClientDBStore } from '../dbStoreImplement/clientDbStore';
import { IClientStore } from '../storeInterface';

@injectable()
export class ClientStore implements IClientStore {
    @inject(TypeObject.clientDBStore) dbStore: ClientDBStore;
    addclient(client: IClientModel): Observable<IPayload<IClientModel>> {
        return this.dbStore.addClient(client).map((clients: IResult<IClientModel>) => {
            if (clients.recordset.length > 0) {
                return SendPayload<IClientModel>(true, clients.recordset[0]);
            }
            return SendPayload<IClientModel>(false, null, FailureMessages.NO_RESULT_FOUND);
        });
    }
    getclients(userid: string, type: 'true' | 'false'): Observable<IPayload<Array<IClientModel>>> {
        let clientType: boolean = (type === 'true') ? true : false;
        return this.dbStore.getClients(userid, clientType).map((clients: IResult<Array<IClientModel>>) => {
            if (clients.recordsets[0].length > 0) {
                return SendPayload<Array<IClientModel>>(true, clients.recordsets[0]);
            }
            return SendPayload(false, [], FailureMessages.NO_RESULT_FOUND);
        });
    }
}
