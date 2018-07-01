import { NextFunction, Request, Response, Router } from 'express';
import * as httpStatus from 'http-status-codes';
import { GenerateUserToken } from '../middlewares/authentication.middleware';
import { loginFieldValidation } from '../middlewares/user.middleware';
import { SendPayload } from '../models';
import { IoC } from '../store/IoC_Containers/container';
import { IUserStore } from '../store/storeInterface';
import { FailureMessages } from '../util/messages.enum';
import { TypeObject } from '../util/store_Types';

export class IndividualController {
    constructor(router: Router) {
        router.post('/login', loginFieldValidation, this.login.bind(this));
        router.get('/forgotpassword', this.forgotPassword.bind(this));
    }
    login(req: Request, res: Response, next: NextFunction) {
        IoC.get<IUserStore>(TypeObject.userStore).getUser(req.body).subscribe((user) => {
            if (user.success) {
                GenerateUserToken(user.result).subscribe((identity) => {
                    return res.status(httpStatus.OK).type('json').send(SendPayload(true, identity));
                }, (err) => {
                    return res.status(httpStatus.BAD_REQUEST).type('json').send(FailureMessages.TOKEN_NOT_CREATED);
                });
            } else {
                return res.status(httpStatus.NOT_FOUND).send(FailureMessages.NO_RESULT_FOUND);
            }
        }, (err) => {
            return res.status(httpStatus.FORBIDDEN).type('json').send('');
        });
    }
    forgotPassword(req: Request, res: Response, next: NextFunction) {
    }
}
