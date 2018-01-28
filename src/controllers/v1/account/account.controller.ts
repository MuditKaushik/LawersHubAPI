import { Request, Response, Router } from 'express';
import * as httpStatus from 'http-status-codes';
import { AuthMiddlewares } from '../../../middlewares/authMiddleware';
import { IIdentityModel, ILoginModel, ISignupModel } from '../../../models/v1_models';
import { UserManager, CommonManager } from '../../../repository/facade/facades';
import { error } from 'util';
import { readFileSync } from 'fs';

export class AccountController extends AuthMiddlewares {
    constructor(route: Router) {
        super();
        route.post('/login', this.login.bind(this));
        route.post('/signup', this.signup.bind(this));
        route.get('/forgotpassword', this.forgotPassword.bind(this));
        route.get('/getstatescity', this.states_cities.bind(this));
        route.get('/getcountry', this.getcountry.bind(this));
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
        UserManager.addUserFacade(req.body as ISignupModel).subscribe((result) => { 
            return res.status(httpStatus.OK).send(httpStatus.CREATED);
        },(err)=>{
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('unable to create');
        });
    }
    states_cities(req: Request, res: Response) {
        CommonManager.getStatesAndCities().subscribe((result: any) => {
            return res.status(httpStatus.OK).send(result);
        }, (err: any) => {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
        });
    }
    getcountry(req: Request, res: Response) {
        CommonManager.getCountries().subscribe((result: any) => {
            return res.status(httpStatus.OK).send(result);
        }, (err: any) => {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
}
