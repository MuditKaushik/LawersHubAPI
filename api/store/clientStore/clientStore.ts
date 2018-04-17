import { IResult } from 'mssql';
import { IClientStore } from './IclientStore';
import { ClientDBStore } from './clientDbStore';

export class ClientStore extends ClientDBStore implements IClientStore {
    constructor() {
        super();
    }
}