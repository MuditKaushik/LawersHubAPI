import { ClientFacade } from '../client/clientFacade';
import { IClientFacade } from '../client/IclientFacade';
import { IUserFacade } from '../user/IuserFacade';
import { UserFacade } from '../user/userFacade';

export const UserManager: IUserFacade = new UserFacade();
export const ClientManager: IClientFacade = new ClientFacade();
