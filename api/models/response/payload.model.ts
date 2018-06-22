export interface IPayload<T> {
    success: boolean;
    result: T;
    message?: string;
}

export function SendPayload<T>(isSuccess: boolean, data: T | any, message?: string): IPayload<T> {
    let payload = {
        result: data,
        success: isSuccess,
        message: message,
    };
    return payload;
}
