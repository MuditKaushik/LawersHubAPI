import { Observable } from '@reactivex/rxjs';
import { IIdentityModel } from '../models/specimen';
let userIdentity: IIdentityModel;
export function setIdentity(identity: IIdentityModel) {
    userIdentity = identity;
}
export function getIdentity(): IIdentityModel {
    return userIdentity;
}
