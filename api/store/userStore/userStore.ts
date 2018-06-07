import { Observable } from '@reactivex/rxjs';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IProcedureResult, IResult } from 'mssql';
import { ILoginModel, IPayload, IUserModel, SendPayload } from '../../models/specimen';
import { FailureMessages, SuccessMessage } from '../../util/messages.enum';
import { IUserStore } from '../storeInterface';
import { UserDBStore } from './userDbStore';
@injectable()
export class UserStore implements IUserStore {
    private get dbStore(): UserDBStore {
        return new UserDBStore();
    }
    getUser(login: ILoginModel): Observable<IPayload> {
        return this.dbStore.getDbUser(login.username, login.password).map((result: IResult<IUserModel>) => {
            if (result.recordset.length > 0) {
                return SendPayload(true, result.recordset[0]);
            }
            return SendPayload(false, [], FailureMessages.USER_NOT_EXISTS);
        });
    }
    addUsers(user: IUserModel): Observable<IPayload> {
        return this.dbStore.addDbUser(user).map((result: IProcedureResult<any>) => {
            return SendPayload(result.output.iscreated, [], (result.output.iscreated) ? SuccessMessage.USER_CREATED : FailureMessages.USER_NOT_CREATED);
        });
    }
}
