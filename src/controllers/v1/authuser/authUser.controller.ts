import { NextFunction, Request, Response, Router } from 'express';
import * as httpStatus from 'http-status-codes';
import { AuthMiddlewares } from '../../../middlewares/authMiddleware';
import { ClientManager } from '../../../repository/facade/facades';
import { IUserClient, IResponseBody, ResponseMessage } from '../../../models/v1_models';

export class AuthUserController extends AuthMiddlewares {
    constructor(route: Router) {
        super();
        route.get('/getclients/:userId/:isprivate?', this.validateToken, this.getClientList.bind(this));
        route.post('/addclient/:userId', this.validateToken, this.addClient.bind(this));
        route.delete('/removeclient/:clientid/:userid', this.removeClient.bind(this));
    }
    getClientList(req: Request, res: Response) {
        ClientManager.getClientsListFacade(req.param('userId'), req.params.isprivate as boolean)
            .subscribe((result: IResponseBody<Array<IUserClient>>) => {
                return res.status(httpStatus.OK).send(result);
            }, (err) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(ResponseMessage.SERVER_ERROR);
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
    removeClient(req: Request, res: Response) {
        ClientManager.removeClientFacade(req.param('clientid'), req.param('userid'))
            .subscribe((result: IResponseBody<boolean>) => {
                return res.status(httpStatus.OK).send(result);
            }, (err) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(ResponseMessage.SERVER_ERROR);
            });
    }
}
