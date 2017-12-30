import { AsyncSubject, Observable, Scheduler } from '@reactivex/rxjs';
import { NextFunction, Request, Response, Router } from 'express';
import * as httpStatus from 'http-status-codes';
import { AuthMiddlewares } from '../../../middlewares/authMiddleware';
import { IIdentityModel } from '../../../models/v1_models';
import { ClientFacade } from '../../../repository/client/clientFacade';
import { IClientFacade } from '../../../repository/client/IClientFacade';

export class AccountController extends AuthMiddlewares {
    clientFacade: IClientFacade;
    constructor(route: Router) {
        super();
        this.clientFacade = new ClientFacade();
        route.get('/login', this.login.bind(this));
        route.get('/forgotpassword', this.forgotPassword.bind(this));
        route.post('/signup', this.signup.bind(this));
        route.get('/client', this.getClientList.bind(this));
    }
    login(req: Request, res: Response) {
        let user = {} as IIdentityModel;
        user.Id = 1;
        user.userName = 'mudit_kaushik';
        user.email = 'mudit@gmail.com';
        user.fullName = 'Mudit Mohan Kaushik';
        user.isActive = true;
        this.generateAccessToken(user).subscribe((data) => {
            user.access_token = `bearer ${data}`;
            return res.status(httpStatus.OK).send(user);
        }, (err) => {
            return res.status(httpStatus.FORBIDDEN).send(err);
        });
    }
    forgotPassword(req: Request, res: Response) {
        return res.status(httpStatus.OK).send('reset password link has been sent your registered email address.');
    }
    signup(req: Request, res: Response) {
        return res.status(httpStatus.CREATED).send('new user added.');
    }
    getClientList(req: Request, res: Response) {
        this.clientFacade.getClientsListFacade().subscribe((result) => {
            return res.status(httpStatus.OK).send(result.recordset);
        }, (err) => {
            return res.status(httpStatus.NOT_FOUND).send();
        });
    }
}
