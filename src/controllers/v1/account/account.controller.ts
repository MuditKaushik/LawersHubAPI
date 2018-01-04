import { Request, Response, Router } from 'express';
import * as httpStatus from 'http-status-codes';
import { AuthMiddlewares } from '../../../middlewares/authMiddleware';
import { IIdentityModel, ILoginModel } from '../../../models/v1_models';
import { UserManager } from '../../../repository/facade/facades';

export class AccountController extends AuthMiddlewares {
    constructor(route: Router) {
        super();
        route.post('/login', this.login.bind(this));
        route.post('/signup', this.signup.bind(this));
        route.get('/forgotpassword', this.forgotPassword.bind(this));
    }
    login(req: Request, res: Response) {
        UserManager.getUserFacade(req.body as ILoginModel).subscribe((result) => {
            if (result) {
                this.generateAccessToken(result).subscribe((identity) => {
                    return res.status(httpStatus.OK).send(identity);
                }, (err) => {
                    return res.status(httpStatus.FORBIDDEN).send();
                });
            } else {
                return res.status(httpStatus.OK).send();
            }
        });
    }
    forgotPassword(req: Request, res: Response) {
        return res.status(httpStatus.OK).send('reset password link has been sent your registered email address.');
    }
    signup(req: Request, res: Response) {
        return res.status(httpStatus.CREATED).send('new user added.');
    }
}
