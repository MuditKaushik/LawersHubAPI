import { Observable } from '@reactivex/rxjs';
import { IPayload } from '../../models/specimen';
export interface ICommonStore {
    getCountries(): Observable<IPayload>;
    getStates(): Observable<IPayload>;
    getCities(city: string): Observable<IPayload>;
}
