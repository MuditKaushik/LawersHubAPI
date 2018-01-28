import { Observable } from "@reactivex/rxjs";

export interface ICommonFacade {
    getStatesAndCities(): Observable<any>;
    getCountries(): Observable<any>;
}