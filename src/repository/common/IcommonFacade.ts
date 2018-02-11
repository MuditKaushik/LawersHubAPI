import { Observable } from "@reactivex/rxjs";

export interface ICommonFacade {
    getStates(): Observable<Array<string>>;
    getCities(state: string): Observable<Array<string>>;
    getCountries(): Observable<any>;
}