export interface IPayload {
    success: boolean;
    result: any;
    message?: string;
}

export function SendPayload<T>(isSuccess: boolean, data: T, message?: string): IPayload {
    let payload: IPayload = {
        success: isSuccess,
        result: data,
        message: message
    };
    return payload;
}
