import { Observable, Observer } from '@reactivex/rxjs';
import { IResult } from 'mssql';
import { ILoginModel, ISignupModel, IAuthUser } from '../../models/v1_models';
import { IUserFacade } from './IuserFacade';
import { UserRepository } from './userRepository';

export class UserFacade extends UserRepository implements IUserFacade {
    constructor() {
        super();
    }
    getUserFacade(login: ILoginModel): Observable<IAuthUser> {
        return Observable.create((observer: Observer<IAuthUser>) => {
            this.getUser(login.username, login.password).subscribe((result: IResult<any>) => {
                observer.next(result.recordset[0] as IAuthUser);
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
    addUserFacade(signup: ISignupModel): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            this.adduser(signup).subscribe((result: IResult<any>) => {
                observer.next(result.output.iscreated);
            }, (err: any) => {
                observer.error(err);
            }, () => {
                observer.complete();
            });
        });
    }
}
