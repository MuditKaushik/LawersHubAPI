import { NextFunction, Request, Response, Router } from 'express';
import * as httpStatus from 'http-status-codes';
import { AuthMiddlewares } from '../../../middlewares/authMiddleware';
import { ClientManager } from '../../../repository/facade/facades';
import { IUserClient } from '../../../models/v1_models';

export class AuthUserController extends AuthMiddlewares {
    constructor(route: Router) {
        super();
        route.get('/clients/:userId/:isPrivate?', this.validateToken, this.getClientList.bind(this));
    }
    getClientList(req: Request, res: Response) {
        ClientManager.getClientsListFacade(req.params.userId, req.params.isPrivate)
            .subscribe((result: Array<IUserClient>) => {
                if (result.length > 0) {
                    return res.status(httpStatus.OK).send(result);
                } else {
                    return res.status(httpStatus.NOT_FOUND).send(httpStatus.NOT_FOUND);
                }
            }, (err) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(httpStatus.INTERNAL_SERVER_ERROR);
            });
    }
}
