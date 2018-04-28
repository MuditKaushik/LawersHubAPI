import { Observable } from '@reactivex/rxjs';
import { ILoginModel, IPayload } from '../../models/specimen';
export interface IUserStore {
    getUser(login: ILoginModel): Observable<IPayload>;
}
