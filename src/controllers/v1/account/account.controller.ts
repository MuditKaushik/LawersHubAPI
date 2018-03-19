import { Request, Response, Router } from 'express';
import { readFileSync } from 'fs';
import * as httpStatus from 'http-status-codes';
import { error } from 'util';
import { AuthMiddlewares } from '../../../middlewares/authMiddleware';
import { IIdentityModel, ILoginModel, ISignupModel, IResponseBody, IAuthUser, SendResponse } from '../../../models/v1_models';
import { CommonManager, UserManager } from '../../../repository/facade/facades';

export class AccountController extends AuthMiddlewares {
    constructor(route: Router) {
        super();
        route.post('/login', this.login.bind(this));
        route.post('/signup', this.signup.bind(this));
        route.get('/forgotpassword', this.forgotPassword.bind(this));
    }
    login(req: Request, res: Response) {
        UserManager.getUserFacade(req.body as ILoginModel).subscribe((result: IResponseBody<IAuthUser>) => {
            if (result.success) {
                this.generateAccessToken(result.result).subscribe((identity: IResponseBody<IIdentityModel>) => {
                    return res.status(httpStatus.OK).send(identity);
                }, (err) => {
                    return res.status(httpStatus.FORBIDDEN).send();
                });
            } else {
                return res.status(httpStatus.NOT_FOUND).send(result);
            }
        });
    }
    forgotPassword(req: Request, res: Response) {
        return res.status(httpStatus.OK).send('reset password link has been sent your registered email address.');
    }
    signup(req: Request, res: Response) {
        UserManager.addUserFacade(req.body as ISignupModel).subscribe((result) => {
            return res.status(httpStatus.OK).send(result);
        }, (err) => {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('unable to create');
        });
    }
}
