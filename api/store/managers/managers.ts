import { ManagerTypes } from '../../util/managerTypeEnum';
import { IUserStore } from '../userStore/IuserStore';
import { IClientStore } from '../clientStore/IclientStore';
import { ICommonStore } from '../commonStore/IcommonStore';
import { IIndividualStore } from '../individualStore/IindividualStore';
import { ClientStore } from '../clientStore/clientStore';
import { CommonStore } from '../commonStore/commonStore';
import { IndividualStore } from '../individualStore/individualStore';
import { UserStore } from '../userStore/userStore';

export function* GetManager() {
    let clientManager: IClientStore = new ClientStore();
    let userManager: IUserStore = new UserStore();
    let individualManager: IIndividualStore = new IndividualStore();
    let commonManager: ICommonStore = new CommonStore();
    yield {
        ClientManager: clientManager,
        UserManager: userManager,
        IndividualManager: individualManager,
        CommonManager: commonManager
    };
}