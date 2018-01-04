import { Observable } from '@reactivex/rxjs';
import { ILoginModel, ISignupModel } from '../../models/v1_models';

export interface IUserFacade {
    getUserFacade(login: ILoginModel): Observable<any>;
    getAllUserFacade(): Observable<Array<ISignupModel>>;
}
