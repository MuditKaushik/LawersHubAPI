import { Observable, Observer } from '@reactivex/rxjs';
import { IResult } from 'mssql';
import { ILoginModel, ISignupModel, IAuthUser, IResponseBody, SendResponse, ResponseMessage } from '../../models/v1_models';
import { IUserFacade } from './IuserFacade';
import { UserRepository } from './userRepository';
import { CreateUser } from '../utility/util';

export class UserFacade extends UserRepository implements IUserFacade {
    constructor() {
        super();
    }
    getUserFacade(login: ILoginModel): Observable<IResponseBody<IAuthUser>> {
        return this.getUser(login.username, login.password).map((result: IResult<any>) => {
            if (result.recordset.length > 0) {
                return SendResponse<IAuthUser>(result.recordset[0], true);
            }
            else {
                return SendResponse<IAuthUser>({}, false, ResponseMessage.NO_USER);
            }
        }).catch(this.errorHandler);
    }
    getAllUserFacade(): Observable<Array<ISignupModel>> {
        return Observable.create((observer: Observer<Array<ISignupModel>>) => {
            this.getAllUsers().subscribe((result: IResult<any>) => {
                observer.next(result.recordset[0] as Array<ISignupModel>);
            }, (err) => {
                observer.error(err);
            }, () => {
                observer.complete();
            });
        });
    }
    addUserFacade(signup: ISignupModel): Observable<IResponseBody<boolean>> {
        CreateUser(signup, { username: signup.username, password: signup.password }).next();
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

    errorHandler(err: Error): Observable<any> {
        throw SendResponse<string>(err, false, err.message);
    }
}
