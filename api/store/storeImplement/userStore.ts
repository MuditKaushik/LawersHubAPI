import { Observable } from '@reactivex/rxjs';
import { inject, injectable } from 'inversify';
import { IProcedureResult, IResult } from 'mssql';
import 'reflect-metadata';
import { ILoginModel, IPayload, IUserModel, SendPayload } from '../../models';
import { FailureMessages, SuccessMessage } from '../../util/messages.enum';
import { TypeObject } from '../../util/store_Types';
import { UserDBStore } from '../dbStoreImplement/userDbStore';
import { IoC } from '../IoC_Containers';
import { IUserStore } from '../storeInterface';
@injectable()
export class UserStore implements IUserStore {
    @inject(TypeObject.userDBStore) dbStore: UserDBStore;
    getUser(login: ILoginModel): Observable<IPayload<IUserModel>> {
        return this.dbStore.getDbUser(login.username, login.password)
            .map((result: IResult<IUserModel>) => {
                if (result.recordset.length > 0) {
                    return SendPayload<IUserModel>(true, result.recordset[0]);
                }
                return SendPayload(false, null, FailureMessages.USER_NOT_EXISTS);
            });
    }
    addUsers(user: IUserModel): Observable<IPayload<any>> {
        return this.dbStore.addDbUser(user)
            .map((result: IProcedureResult<any>) => {
                return SendPayload(result.output.iscreated, [], (result.output.iscreated) ? SuccessMessage.USER_CREATED : FailureMessages.USER_NOT_CREATED);
            });
    }
}
