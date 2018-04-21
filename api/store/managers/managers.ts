import { IClientStore } from '../clientStore/IclientStore';
import { ClientStore } from '../clientStore/clientStore';
import { ICommonStore } from '../commonStore/IcommonStore';
import { CommonStore } from '../commonStore/commonStore';
import { IIndividualStore } from '../individualStore/IindividualStore';
import { IndividualStore } from '../individualStore/individualStore';
import { IUserStore } from '../userStore/IuserStore';
import { UserStore } from '../userStore/userStore';
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
