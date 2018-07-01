import { Observable } from '@reactivex/rxjs';
import { ILoginModel, IPayload, IUserModel } from '../../models';
export interface IUserStore {
    getUser(login: ILoginModel): Observable<IPayload<IUserModel>>;
    getUserById(userId: string): Observable<IPayload<IUserModel>>;
    addUser(user: IUserModel): Observable<IPayload<any>>;
    logoutUser(userId: string): Observable<IPayload<boolean>>;
}
