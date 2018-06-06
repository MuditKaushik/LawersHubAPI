import { Container } from 'inversify';
import { ClientStore } from '../clientStore';
import { CommonStore } from '../commonStore';
import { IndividualStore } from '../individualStore';
import { UserStore } from '../userStore';
import { IClientStore, ICommonStore, IIndividualStore, IUserStore } from '../storeInterface'
import { TypeObject } from '../../util/store_Types';

export class Managers {
    get ClientManager(): IClientStore {
        return new ClientStore();
    }
    get UserManager(): IUserStore {
        return new UserStore();
    }
    get IndividualManager(): IIndividualStore {
        return new IndividualStore();
    }
    get CommonManager(): ICommonStore {
        return new CommonStore();
    }
}

const IoC_Container = new Container();

IoC_Container.bind<IClientStore>(TypeObject.clientStore).to(ClientStore);
IoC_Container.bind<ICommonStore>(TypeObject.commonStore).to(CommonStore);
IoC_Container.bind<IIndividualStore>(TypeObject.individualStore).to(IndividualStore);
IoC_Container.bind<IUserStore>(TypeObject.userStore).to(UserStore);

export { IoC_Container };
