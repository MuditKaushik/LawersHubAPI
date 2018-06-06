import { Observable } from '@reactivex/rxjs';
import { IClientModel, IPayload } from '../../models/specimen';
export interface IClientStore {
    getclients(userid: string, type: 'true' | 'false'): Observable<IPayload>;
    addclient(client: IClientModel): Observable<IPayload>;
}
