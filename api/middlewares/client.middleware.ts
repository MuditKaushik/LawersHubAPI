import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status-codes';
import { getIdentity } from '../util/identity';
import { FailureMessages } from '../util/messages.enum';

export function ClientValidation(req: Request, res: Response, next: NextFunction) {
    let { type, userid } = req.params;
    if ((type != null && type !== 'undefined')
        && (userid != null && typeof userid === 'string')
        && (getIdentity().userid === userid)) {
        next();
    } else {
        return res.status(httpStatus.BAD_REQUEST).send(FailureMessages.UNAUTHORIZE_ACCESS);
    }
}

export function addClientValidation(req: Request, res: Response, next: NextFunction) {
    let { userid } = req.params;
    if (getIdentity().userid === userid) {
        next();
    } else {
        return res.status(httpStatus.BAD_REQUEST).send(FailureMessages.UNAUTHORIZE_ACCESS);
    }
}
