import { IIdentityModel } from '../models';
let userIdentity: IIdentityModel;
export function setIdentity(identity: IIdentityModel) {
    userIdentity = identity;
}
export function getIdentity(): IIdentityModel {
    return userIdentity;
}
