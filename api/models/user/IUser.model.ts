import { ILoginModel } from './ILogin.model';
export interface IUserModel extends ILoginModel {
    userid: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
}
