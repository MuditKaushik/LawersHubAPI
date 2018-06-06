import { IIndividualStore } from '../storeInterface';
import { IndividualDBStore } from './individualDbStore';
export class IndividualStore extends IndividualDBStore implements IIndividualStore {
    constructor() {
        super();
    }
}
