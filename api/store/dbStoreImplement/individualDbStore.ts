import { TypeObject } from '../../util/store_Types';
import { IoC } from '../IoC_Containers';
import { IDBConnect } from '../storeInterface';

export class IndividualDBStore {
    private _db: IDBConnect;
    constructor() {
        this._db = IoC.get<IDBConnect>(TypeObject.dbConnect);
    }
}
