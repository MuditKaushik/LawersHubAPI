import { NextFunction, Request, Response, Router } from 'express';
import * as httpStatus from 'http-status-codes';
import { AuthMiddlewares } from '../../../middlewares/authMiddleware';
import { UserManager } from '../../../repository/facade/facades';

export class AuthUserController extends AuthMiddlewares {
    constructor(route: Router) {
        super();
        route.get('/clients/:userId', this.validateToken, this.getAuthUsersList.bind(this));
    }
    getAuthUsersList(req: Request, res: Response) {
        UserManager.getAllUserFacade().subscribe((result) => {
            if (result) {
                return res.status(httpStatus.OK).send(result);
            } else {
                return res.status(httpStatus.NOT_FOUND).send(httpStatus.NOT_FOUND);
            }
        }, (err) => {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(httpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}
