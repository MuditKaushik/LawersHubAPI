export interface IResponseBody<T> {
    message?: string;
    success: boolean,
    result: T
}
export function SendResponse<T>(result: any , isSuccess: boolean, message?: string): IResponseBody<T> {
    let responseBody: IResponseBody<T> = { success: isSuccess, result: result, message: message };
    return responseBody;
}
