import { NextFunction, Request, Response, Router } from 'express';
import { Managers } from '../store/managers/managers';

export class IndividualController extends Managers {
    constructor(router: Router) {
        super();
        router.get('/login', this.login.bind(this));
    }
    login(req: Request, res: Response, next: NextFunction) {
        this.UserManager.getuser().subscribe((result) => {
            return res.status(200).type('json').send(result);
        });
    }
}
