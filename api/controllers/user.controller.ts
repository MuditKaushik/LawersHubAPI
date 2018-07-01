import { NextFunction, Request, Response, Router } from 'express';
import * as httpStatus from 'http-status-codes';
import { IoC } from '../store/IoC_Containers';
import { IUserStore } from '../store/storeInterface';
import { TypeObject } from '../util/store_Types';
export class UserController {
    constructor(router: Router) {
        router.post('/adduser', this.addUser.bind(this));
        router.get('/logout', this.logout.bind(this));
    }
    addUser(req: Request, res: Response) {
        IoC.get<IUserStore>(TypeObject.userStore).addUser(req.body).subscribe((result) => {
            res.status(httpStatus.OK).type('json').send(result);
            return;
        }, (err) => {
            res.status(httpStatus.NOT_MODIFIED).type('json').send(err);
            return;
        });
    }
    logout(req: Request, res: Response) { }
}
