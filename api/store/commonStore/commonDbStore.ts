import { Observable, Observer } from '@reactivex/rxjs';
import * as fs from 'fs';
import * as path from 'path';
import { ICityModel, ICountryModel, IStateModel } from '../../models/specimen';
export class CommonDBStore {
    private _countryPath: string;
    private _states: string;
    constructor() {
        this._countryPath = path.join(process.cwd(), '/config/country.json');
        this._states = path.join(process.cwd(), '/config/states_cities.json');
    }
    getDBCountries(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            let readCountryJson = fs.readFileSync(this._countryPath, { encoding: 'utf8' });
            observer.next(readCountryJson);
            observer.complete();
        });
    }
    getDBStates(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            let readStatesJson = fs.readFileSync(this._states, { encoding: 'utf8' });
            let parseJSON = JSON.parse(readStatesJson);
            observer.next(parseJSON);
            observer.complete();
        });
    }
}