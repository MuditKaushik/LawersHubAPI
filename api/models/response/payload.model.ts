export interface IPayload {
    success: boolean;
    result: any;
    message?: string;
}

export function SendPayload<T>(isSuccess: boolean, data: T, message?: string): IPayload {
    let payload: IPayload = {
        result: data,
        success: isSuccess,
        message: message,
    };
    return payload;
}
