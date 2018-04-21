import { Observable } from '@reactivex/rxjs';
import { ICountryModel, IStateModel, ICityModel, IPayload, SendPayload } from '../../models/specimen';
import { ICommonStore } from './IcommonStore';
import { CommonDBStore } from './commonDbStore';

export class CommonStore extends CommonDBStore implements ICommonStore {
    constructor() {
        super();
    }
    getCountries(): Observable<IPayload> {
        return this.getDBCountries().map((result: string) => {
            return SendPayload(true, <Array<ICountryModel>>JSON.parse(result).country);
        });
    }
    getStates(): Observable<IPayload> {
        return this.getDBStates().map((result: any) => {
            let states: Array<IStateModel> = new Array<IStateModel>();
            Object.keys(result).forEach((state: string, index: number) => {
                states.push({ name: state, value: index });
            });
            return SendPayload(true, states);
        });
    }
    getCities(city: string): Observable<IPayload> {
        return this.getDBStates().map((response) => {
            let cities: Array<ICityModel> = [];
            if (response[city] != null) {
                for (let [index, name] of (<Array<any>>response[city]).entries()) {
                    cities.push({ name: name, value: index });
                }
            }
            return SendPayload(true, cities);
        });
    }
}