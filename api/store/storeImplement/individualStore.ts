import { injectable } from 'inversify';
import 'reflect-metadata';
import { IndividualDBStore } from '../dbStoreImplement/individualDbStore';
import { IIndividualStore } from '../storeInterface';
@injectable()
export class IndividualStore extends IndividualDBStore implements IIndividualStore {
    constructor() {
        super();
    }
}
