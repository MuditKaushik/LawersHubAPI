import { Observable } from '@reactivex/rxjs';
import { ILoginModel, IPayload, IUserModel } from '../../models/specimen';
export interface IUserStore {
    getUser(login: ILoginModel): Observable<IPayload>;
    addUsers(user: IUserModel): Observable<IPayload>;
}
