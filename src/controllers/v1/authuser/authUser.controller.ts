import { NextFunction, Request, Response, Router } from 'express';
import * as httpStatus from 'http-status-codes';
import { AuthMiddlewares } from '../../../middlewares/authMiddleware';
import { ClientManager } from '../../../repository/facade/facades';
import { IUserClient, IResponseBody } from '../../../models/v1_models';

export class AuthUserController extends AuthMiddlewares {
    constructor(route: Router) {
        super();
        route.get('/getclients/:userId/:isprivate', this.validateToken, this.getClientList.bind(this));
        route.post('/addclient/:userId', this.validateToken, this.addClient.bind(this));
    }
    getClientList(req: Request, res: Response) {
        ClientManager.getClientsListFacade(req.param('userId'), req.params.isPrivate as boolean)
            .subscribe((result: IResponseBody<Array<IUserClient>>) => {
                if (result.success) {
                    return res.status(httpStatus.OK).send(result);
                } else {
                    return res.status(httpStatus.NOT_FOUND).send(result);
                }
            }, (err) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(httpStatus.INTERNAL_SERVER_ERROR);
            });
    }
    addClient(req: Request, res: Response) {
        ClientManager.addClientFacade(req.body as IUserClient, req.param('userId'))
            .subscribe((result) => {
                return res.status(httpStatus.CREATED).send(result);
            }, (err) => {
                return res.status(httpStatus.METHOD_FAILURE).send(err.message);
            });
    }
}
