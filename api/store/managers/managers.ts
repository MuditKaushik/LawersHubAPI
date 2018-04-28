import { ClientStore } from '../clientStore/clientStore';
import { IClientStore } from '../clientStore/IclientStore';
import { CommonStore } from '../commonStore/commonStore';
import { ICommonStore } from '../commonStore/IcommonStore';
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
