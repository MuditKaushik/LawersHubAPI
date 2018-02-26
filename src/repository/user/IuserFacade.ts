import { Observable } from '@reactivex/rxjs';
import { ILoginModel, ISignupModel, IAuthUser, IResponseBody } from '../../models/v1_models';

export interface IUserFacade {
    getUserFacade(login: ILoginModel): Observable<IResponseBody<IAuthUser>>;
    getAllUserFacade(userid: string): Observable<Array<ISignupModel>>;
    addUserFacade(signup: ISignupModel): Observable<IResponseBody<boolean>>;
}
