import { Observable } from '@reactivex/rxjs';
import {IResult} from 'mssql';

export interface IClientFacade {
    getClientsListFacade(): Observable<IResult<any>>;
}
