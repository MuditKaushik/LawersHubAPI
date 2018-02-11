import { AjaxRequest, AjaxResponse, Observable, Observer } from '@reactivex/rxjs';
import * as fs from 'fs';

export class CommonRepository {
    constructor() {
    }
    getStates(): Observable<Array<string>> {
        let filePath = `${process.cwd()}/config/states_cities.json`;
        return Observable.create((observer: Observer<Array<string>>) => {
            let file = fs.readFileSync(filePath, 'utf8');
            observer.next(Object.keys(JSON.parse(file)));
            observer.complete();
        });
    }
    getCities(state: string): Observable<Array<string>> {
        let filePath = `${process.cwd()}/config/states_cities.json`;
        return Observable.create((observer: Observer<Array<string>>) => {
            let file = fs.readFileSync(filePath, 'utf8');
            let cityOfState = JSON.parse(file)[state];
            observer.next(cityOfState);
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