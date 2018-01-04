import { Observable, Observer } from '@reactivex/rxjs';
import { IResult } from 'mssql';
import { ILoginModel, ISignupModel } from '../../models/v1_models';
import { IUserFacade } from './IuserFacade';
import { UserRepository } from './userRepository';

export class UserFacade extends UserRepository implements IUserFacade {
    constructor() {
        super();
    }
    getUserFacade(login: ILoginModel): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            this.getUser(login.username, login.password).subscribe((result: IResult<any>) => {
                observer.next(result.recordset[0]);
            }, (err: any) => {
                observer.error(err);
            }, () => {
                observer.complete();
            });
        });
    }
    getAllUserFacade(): Observable<Array<ISignupModel>> {
        return Observable.create((observer: Observer<Array<ISignupModel>>) => {
            this.getAllUsers().subscribe((result: IResult<any>) => {
                observer.next(result.recordsets[0] as Array<ISignupModel>);
            }, (err) => {
                observer.error(err);
            }, () => {
                observer.complete();
            });
        });
    }
}
