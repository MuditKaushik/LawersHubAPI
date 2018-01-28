import { AjaxError, AjaxRequest, AjaxResponse } from '@reactivex/rxjs';

export class Fetch {
    public ajaxRequest: AjaxRequest;
    constructor() {
        this.ajaxRequest.url = `../pre_scripts/db_schema.sql`;
        this.ajaxRequest.method = 'GET';
        this.ajaxRequest.async = true;
    }
}
