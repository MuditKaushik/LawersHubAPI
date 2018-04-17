import { IResult } from 'mssql';
import { ICommonStore } from './IcommonStore';
import { CommonDBStore } from './commonDbStore';

export class CommonStore extends CommonDBStore implements ICommonStore {
    constructor() {
        super();
    }
}