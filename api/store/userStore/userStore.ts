import { Observable } from '@reactivex/rxjs';
import { IResult } from 'mssql';
import { ILoginModel, IPayload, IUserModel, SendPayload } from '../../models/specimen';
import { FailureMessages } from '../../util/messages.enum';
import { IUserStore } from './IuserStore';
import { UserDBStore } from './userDbStore';
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
}
