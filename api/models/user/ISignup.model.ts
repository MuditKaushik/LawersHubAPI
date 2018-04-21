import { ILoginModel } from './ILogin.model';
export interface ISignupModel extends ILoginModel {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
}