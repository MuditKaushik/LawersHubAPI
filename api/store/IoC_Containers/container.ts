import { AsyncContainerModule, Container, ContainerModule, interfaces } from 'inversify';
import { LogIdentity } from '../../middlewares/identity.middleware';
import { TypeObject } from '../../util/store_Types';
import { ClientDBStore, CommonDBStore, IndividualDBStore, UserDBStore } from '../dbStoreImplement';
import { ClientStore, CommonStore, ConnectDatabase, IndividualStore, UserStore } from '../storeImplement';
import { IClientStore, ICommonStore, IDBConnect, IIndividualStore, IUserStore } from '../storeInterface';
const IoC: Container = new Container();
class IoC_Container {
    constructor() {
        /**
         * simple container binding.
         */
        // this.bindContainer();
        /**
         * load all the container binding asynchronously.
         */
        IoC.loadAsync(this.asyncBindContainerModule());
        /**
         * load all the container binding synchronously.
         */
        // IoC.load(this.bindContainerModule());
    }
    protected bindContainerModule(): ContainerModule {
        return new ContainerModule((
            bind: interfaces.Bind,
            unbind: interfaces.Unbind,
            isBound: interfaces.IsBound,
            rebind: interfaces.Rebind,
        ) => {
            bind(TypeObject.clientDBStore).to(ClientDBStore);
            bind(TypeObject.commonDBStore).to(CommonDBStore);
            bind(TypeObject.individualDBStore).to(IndividualDBStore);
            bind(TypeObject.userDBStore).to(UserDBStore);
            bind(TypeObject.userIdentity).to(LogIdentity);
            bind<IClientStore>(TypeObject.clientStore).to(ClientStore);
            bind<ICommonStore>(TypeObject.commonStore).to(CommonStore);
            bind<IIndividualStore>(TypeObject.individualStore).to(IndividualStore);
            bind<IUserStore>(TypeObject.userStore).to(UserStore);
            bind<IDBConnect>(TypeObject.dbConnect).to(ConnectDatabase);
        });
    }

    asyncBindContainerModule(): AsyncContainerModule {
        return new AsyncContainerModule(async (
            bind: interfaces.Bind,
            unbind: interfaces.Unbind,
            isBound: interfaces.IsBound,
            rebind: interfaces.Rebind,
        ) => {
            await bind(TypeObject.clientDBStore).to(ClientDBStore);
            await bind(TypeObject.commonDBStore).to(CommonDBStore);
            await bind(TypeObject.individualDBStore).to(IndividualDBStore);
            await bind(TypeObject.userDBStore).to(UserDBStore);
            await bind(TypeObject.userIdentity).to(LogIdentity);
            await bind<IClientStore>(TypeObject.clientStore).to(ClientStore);
            await bind<ICommonStore>(TypeObject.commonStore).to(CommonStore);
            await bind<IIndividualStore>(TypeObject.individualStore).to(IndividualStore);
            await bind<IUserStore>(TypeObject.userStore).to(UserStore);
            await bind<IDBConnect>(TypeObject.dbConnect).to(ConnectDatabase);
        });
    }

    bindContainer() {
        IoC.bind(TypeObject.clientDBStore).to(ClientDBStore);
        IoC.bind(TypeObject.commonDBStore).to(CommonDBStore);
        IoC.bind(TypeObject.individualDBStore).to(IndividualDBStore);
        IoC.bind(TypeObject.userDBStore).to(UserDBStore);
        IoC.bind(TypeObject.userIdentity).to(LogIdentity);
        IoC.bind<IClientStore>(TypeObject.clientStore).to(ClientStore);
        IoC.bind<ICommonStore>(TypeObject.commonStore).to(CommonStore);
        IoC.bind<IIndividualStore>(TypeObject.individualStore).to(IndividualStore);
        IoC.bind<IUserStore>(TypeObject.userStore).to(UserStore);
        IoC.bind<IDBConnect>(TypeObject.dbConnect).to(ConnectDatabase);
    }
}
export { IoC_Container, IoC };
