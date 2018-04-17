import { IResult } from 'mssql';
import { ConnectDatabase } from '../dbStore/dbConnect';
import { ICommonStore } from './IcommonStore';

export class CommonDBStore extends ConnectDatabase {
    constructor() {
        super();
    }
}