import { ClientFacade } from '../client/clientFacade';
import { IClientFacade } from '../client/IclientFacade';
import { IUserFacade } from '../user/IuserFacade';
import { UserFacade } from '../user/userFacade';
import { ICommonFacade } from '../common/IcommonFacade';
import { CommonFacade } from '../common/commonFacade';

export const UserManager: IUserFacade = new UserFacade();
export const ClientManager: IClientFacade = new ClientFacade();
export const CommonManager: ICommonFacade = new CommonFacade();
