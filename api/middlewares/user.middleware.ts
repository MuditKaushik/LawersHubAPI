import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status-codes';

export function loginFieldValidation(req: Request, res: Response, next: NextFunction) {
    if ((req.body.username != null && req.body.username !== 'undefined') &&
        (req.body.password != null && req.body.password !== 'undefined')) {
        next();
    } else {
        res.status(httpStatus.BAD_GATEWAY).type('json').send('field validation failed.');
    }
}
