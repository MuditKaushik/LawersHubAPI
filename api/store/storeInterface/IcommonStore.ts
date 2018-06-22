import { Observable } from '@reactivex/rxjs';
import { ICityModel, ICountryModel, IPayload, IStateModel } from '../../models';
export interface ICommonStore {
    getCountries(): Observable<IPayload<Array<ICountryModel>>>;
    getStates(): Observable<IPayload<Array<IStateModel>>>;
    getCities(city: string): Observable<IPayload<Array<ICityModel>>>;
}
