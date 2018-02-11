import { Observable, Observer } from '@reactivex/rxjs';
import { CommonRepository } from './commonRepository';
import { ICommonFacade } from './IcommonFacade';

export class CommonFacade implements ICommonFacade {
    private commonRepo: CommonRepository;
    constructor() {
        this.commonRepo = new CommonRepository();
    }
    getStates(): Observable<Array<string>> {
        return this.commonRepo.getStates();
    }
    getCities(state: string): Observable<Array<string>> {
        return this.commonRepo.getCities(state);
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