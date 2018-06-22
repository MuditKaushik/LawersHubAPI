import { Observable } from '@reactivex/rxjs';
import { ILoginModel, IPayload, IUserModel } from '../../models';
export interface IUserStore {
    getUser(login: ILoginModel): Observable<IPayload<IUserModel>>;
    addUsers(user: IUserModel): Observable<IPayload<any>>;
}
