import { Container, ContainerModule } from 'inversify';
import { ClientStore } from '../clientStore';
import { CommonStore } from '../commonStore';
import { IndividualStore } from '../individualStore';
import { UserStore } from '../userStore';
import { ConnectDatabase } from '../dbStore';
import { IClientStore, ICommonStore, IIndividualStore, IUserStore } from '../storeInterface'
import { TypeObject } from '../../util/store_Types';
const IoC: Container = new Container();
class IoC_Container {
    constructor() {
        IoC.bind<IClientStore>(TypeObject.clientStore).to(ClientStore);
        IoC.bind<ICommonStore>(TypeObject.commonStore).to(CommonStore);
        IoC.bind<IIndividualStore>(TypeObject.individualStore).to(IndividualStore);
        IoC.bind<IUserStore>(TypeObject.userStore).to(UserStore);
        IoC.bind(TypeObject.dbStore).to(ConnectDatabase);
    }
}
export { IoC_Container, IoC };
