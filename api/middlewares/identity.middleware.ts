import { injectable } from 'inversify';
import 'reflect-metadata';
import { IIdentityModel } from '../models/index';
import { IoC } from '../store/IoC_Containers';
import { IUserStore } from '../store/storeInterface';
import { TypeObject } from '../util/store_Types';

@injectable()
export class LogIdentity {
    user: IIdentityModel = {} as IIdentityModel;
    constructor() { }
    private addIdentity(identity: IIdentityModel): this {
        this.user = identity;
        return this;
    }
    updateIdentity(identity: IIdentityModel): this {
        this.user = identity;
        return this;
    }
    removeIdentity(): void {
        this.user = {} as IIdentityModel;
    }
    getUserIdentity(userId: string): void {
        IoC.get<IUserStore>(TypeObject.userStore)
            .getUserById(userId).subscribe((user) => {
                if (user.success) {
                    this.addIdentity({
                        access_token: '',
                        email: user.result.email,
                        fullname: `${user.result.firstName} ${user.result.middleName} ${user.result.lastName}`,
                        isActive: true,
                        userid: user.result.userid,
                        username: user.result.username,
                    });
                } else {
                    this.removeIdentity();
                }
            });
    }
}
