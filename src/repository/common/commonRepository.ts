import { AjaxRequest, AjaxResponse, Observable, Observer } from '@reactivex/rxjs';
import * as fs from 'fs';
import { AjaxObservable, AjaxError } from '@reactivex/rxjs/dist/package/observable/dom/AjaxObservable';

export class CommonRepository {
    constructor() {
    }
    getStatesAndCities(): Observable<any> {
        let filePath = `${process.cwd()}/config/states_cities.json`;
        return Observable.create((observer: Observer<any>) => {
            observer.next(fs.readFileSync(filePath, 'utf8'));
            observer.complete();
        });
    }
    getCountries(): Observable<any> {
        let filePath = `${process.cwd()}/config/country.json`;
        return Observable.create((observer: Observer<any>) => {
            observer.next(fs.readFileSync(filePath, 'utf8'));
            observer.complete();
        });
    }
} 