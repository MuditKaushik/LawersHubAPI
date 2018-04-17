import { IResult } from 'mssql';
import { ConnectDatabase } from '../dbStore/dbConnect';

export class ClientDBStore extends ConnectDatabase {
    constructor() {
        super();
    }
}