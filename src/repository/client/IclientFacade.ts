import { Observable } from '@reactivex/rxjs';
import { IResult } from 'mssql';
import { IUserClient, IResponseBody } from '../../models/v1_models';

export interface IClientFacade {
    getClientsListFacade(userid: string, isprivate: boolean): Observable<IResponseBody<Array<IUserClient>>>;
    addClientFacade(client: IUserClient, userid: string): Observable<IResponseBody<boolean>>;
}
