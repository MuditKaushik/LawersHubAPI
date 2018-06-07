import { Observable } from '@reactivex/rxjs';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { ICityModel, ICountryModel, IPayload, IStateModel, SendPayload } from '../../models/specimen';
import { CommonDBStore } from './commonDbStore';
import { ICommonStore } from '../storeInterface';

@injectable()
export class CommonStore implements ICommonStore {
    private _dbStore: CommonDBStore;
    constructor() {
        this._dbStore = new CommonDBStore();
    }
    getCountries(): Observable<IPayload> {
        return this._dbStore.getCountries().map((result: string) => {
            return SendPayload(true, JSON.parse(result).country as Array<ICountryModel>);
        });
    }
    getStates(): Observable<IPayload> {
        return this._dbStore.getStates().map((result: any) => {
            let states: Array<IStateModel> = new Array<IStateModel>();
            Object.keys(result).forEach((state: string, index: number) => {
                states.push({ name: state, value: index });
            });
            return SendPayload(true, states);
        });
    }
    getCities(city: string): Observable<IPayload> {
        return this._dbStore.getStates().map((response) => {
            let cities: Array<ICityModel> = [];
            if (response[city] != null) {
                for (let [index, cityName] of (response[city] as Array<any>).entries()) {
                    cities.push({ name: cityName, value: index });
                }
            }
            return SendPayload(true, cities);
        });
    }
}