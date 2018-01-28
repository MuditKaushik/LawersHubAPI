export interface ISignupModel {
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    email: string;
    username: string;
    password: string;
}
export interface IAuthUser extends ISignupModel {
    userid: string;
}
