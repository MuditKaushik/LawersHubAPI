import { NextFunction, Request, Response, Router } from 'express';
import * as httpStatus from 'http-status-codes';
import { GenerateUserToken } from '../middlewares/authentication.middleware';
import { loginFieldValidation } from '../middlewares/user.middleware';
import { IUserModel, SendPayload } from '../models/specimen';
import { IIndividualStore } from '../store/storeInterface'
import { TypeObject } from '../util/store_Types';
import { Managers, IoC_Container } from '../store/managers/managers';

export class IndividualController extends Managers {
    constructor(router: Router) {
        super();
        router.post('/login', loginFieldValidation, this.login.bind(this));
        router.get('/forgotpassword', this.forgotPassword.bind(this));
        router.post('/adduser', this.addUser.bind(this));
    }
    login(req: Request, res: Response, next: NextFunction) {
        let userManager = IoC_Container.get<IIndividualStore>(TypeObject.individualStore);
        this.UserManager.getUser(req.body).subscribe((user) => {
            GenerateUserToken(user.result).subscribe((identity) => {
                return res.status(httpStatus.OK).type('json').send(SendPayload(true, identity));
            }, (err) => {
                return res.status(httpStatus.BAD_REQUEST).type('json').send('Unable to create token.');
            });
        }, (err) => {
            return res.status(httpStatus.FORBIDDEN).type('json').send('');
        });
    }
    addUser(req: Request, res: Response, next: NextFunction) {
        this.UserManager.addUsers(req.body).subscribe((result) => {
            return res.status(httpStatus.OK).type('json').send(result);
        }, (err) => {
            return res.status(httpStatus.NOT_MODIFIED).type('json').send();
        });
    }
    forgotPassword(req: Request, res: Response, next: NextFunction) {
    }
}
