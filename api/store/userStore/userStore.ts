import { IResult } from 'mssql';
import { Observable } from '@reactivex/rxjs';
import { UserDBStore } from './userDbStore';
import { IUserStore } from './IuserStore';

export class UserStore extends UserDBStore implements IUserStore {
    constructor() {
        super();
    }
    getuser(): Observable<boolean> {
        return this.getDbUser().map((result: IResult<any>) => { 
            return (result.rowsAffected.length > 0);
        });
    }
}