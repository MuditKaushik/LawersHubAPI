import { NextFunction, Request, Response, Router } from 'express';
import { GetManager } from '../store/managers/managers';

export class IndividualController {
    private _managers = GetManager().next().value;
    constructor(router: Router) {
        router.get('/login', this.login.bind(this));
    }
    login(req: Request, res: Response, next: NextFunction) {
        this._managers.UserManager.getuser().subscribe((result) => {
            return res.status(200).type('json').send(result);
        });
    }
}
