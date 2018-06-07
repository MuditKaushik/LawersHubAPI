import { IIndividualStore } from '../storeInterface';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IndividualDBStore } from './individualDbStore';
@injectable()
export class IndividualStore extends IndividualDBStore implements IIndividualStore {
    constructor() {
        super();
    }
}
