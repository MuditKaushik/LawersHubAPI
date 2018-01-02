import { Observable } from '@reactivex/rxjs';
import { ILoginModel, ISignupModel } from '../../models/v1_models';

export interface IUserFacade {
    getUserFacade(login: ILoginModel): Observable<ISignupModel>;
    getAllUserFacade(): Observable<Array<ISignupModel>>;
}
