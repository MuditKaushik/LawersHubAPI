import { IResult } from 'mssql';
import { ConnectDatabase } from '../dbStore/dbConnect';

export class IndividualDBStore extends ConnectDatabase {
    constructor() {
        super();
    }
}
