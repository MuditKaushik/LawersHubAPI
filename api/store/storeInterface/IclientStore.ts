import { Observable } from '@reactivex/rxjs';
import { IClientModel, IPayload } from '../../models';
export interface IClientStore {
    getclients(userid: string, type: 'true' | 'false'): Observable<IPayload<Array<IClientModel>>>;
    addclient(client: IClientModel): Observable<IPayload<IClientModel>>;
}
