import { Observable, Observer } from '@reactivex/rxjs';
import { CommonRepository } from './commonRepository';
import { ICommonFacade } from './IcommonFacade';

export class CommonFacade implements ICommonFacade {
    private commonRepo: CommonRepository;
    constructor() {
        this.commonRepo = new CommonRepository();
    }
    getStatesAndCities(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            this.commonRepo.getStatesAndCities().subscribe((result: any) => {
                observer.next(result.country);
            }, (err: any) => {
                observer.error(err);
            });
        });
    }
    getCountries(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            this.commonRepo.getCountries().subscribe((result: any) => {
                observer.next(result);
            }, (err: any) => {
                observer.error(err);
            });
        });
    }
}