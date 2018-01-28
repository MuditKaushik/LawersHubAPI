import { Observable } from '@reactivex/rxjs';
import { IResult } from 'mssql';
import { IUserClient } from '../../models/v1_models';

export interface IClientFacade {
    getClientsListFacade(userid: string, isprivate?: boolean): Observable<Array<IUserClient>>;
}
