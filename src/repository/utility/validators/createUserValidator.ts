import { Observable } from "@reactivex/rxjs";
import { UserManager } from '../../facade/facades';
import { IResponseBody, ISignupModel, ILoginModel } from "../../../models/v1_models";

export function* CreateUser(signupUser: ISignupModel, user: ILoginModel) {
    yield UserManager.getUserFacade(user);
    yield UserManager.addUserFacade(signupUser);
}