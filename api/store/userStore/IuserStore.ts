import { Observable } from '@reactivex/rxjs';
export interface IUserStore {
    getuser(): Observable<boolean>;
}