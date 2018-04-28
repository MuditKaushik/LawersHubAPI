import { IResult } from 'mssql';
import { ClientDBStore } from './clientDbStore';
import { IClientStore } from './IclientStore';

export class ClientStore extends ClientDBStore implements IClientStore {
    constructor() {
        super();
    }
}
