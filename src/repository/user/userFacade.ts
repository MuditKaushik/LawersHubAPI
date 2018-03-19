import { Observable, Observer } from '@reactivex/rxjs';
import { IResult } from 'mssql';
import { ILoginModel, ISignupModel, IAuthUser, IResponseBody, SendResponse, ResponseMessage } from '../../models/v1_models';
import { IUserFacade } from './IuserFacade';
import { UserRepository } from './userRepository';

export class UserFacade extends UserRepository implements IUserFacade {
    constructor() {
        super();
    }
    getUserFacade(login: ILoginModel): Observable<IResponseBody<IAuthUser>> {
        return Observable.create((observer: Observer<IResponseBody<IAuthUser>>) => {
            if (!login.username || !login.password) {
                observer.next(SendResponse<IAuthUser>(null, false, ResponseMessage.UNAUTHORIZE_ACCESS));
                observer.complete();
            }
            this.getUser(login.username, login.password).subscribe((result: IResult<any>) => {
                if (result.recordsets[0].length > 0) {
                    observer.next(SendResponse<IAuthUser>(result.recordsets[0], true));
                }
                else {
                    observer.next(SendResponse<IAuthUser>(null, false, ResponseMessage.NO_USER));
                }
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
    addUserFacade(signup: ISignupModel): Observable<IResponseBody<boolean>> {
        return Observable.create((observer: Observer<IResponseBody<boolean>>) => {
            this.adduser(signup).subscribe((result: IResult<any>) => {
                if (result.output.iscreated) {
                    observer.next(SendResponse<boolean>(true, true, ResponseMessage.CREATED));
                } else {
                    observer.next(SendResponse<boolean>(false, false, ResponseMessage.NOT_CREATED));
                }
            }, (err: any) => {
                observer.error(err);
            }, () => {
                observer.complete();
            });
        });
    }
}
