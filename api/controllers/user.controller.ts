import { Router } from 'express';
import { Managers } from '../store/managers/managers';

export class UserController extends Managers {
    constructor(routes: Router) {
        super();
    }
}