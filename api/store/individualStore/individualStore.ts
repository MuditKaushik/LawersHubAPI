import { IIndividualStore } from './IindividualStore';
import { IndividualDBStore } from './individualDbStore';

export class IndividualStore extends IndividualDBStore implements IIndividualStore {
    constructor() {
        super();
    }
}