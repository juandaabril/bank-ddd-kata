import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
    UseFilters,
} from '@nestjs/common';
import { RuntimeError } from '@app/core/shared/base/domain/RuntimeError';

export type Exception = {
    type: any;
    code: number;
    msg: string;
};

const generic: Exception = {
    type: '',
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    msg: 'GenericError',
};

@Catch(RuntimeError)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private exceptions: Exception[]) {}

    catch(error: RuntimeError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let exception = this.exceptions.find(
            (exception) => error instanceof exception.type,
        );
        if (exception === undefined) {
            exception = generic;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        response.status(exception.code).json({
            statusCode: exception.code,
            timestamp: new Date().toISOString(),
            path: request.url,
            msg: exception.msg,
        });
    }
}

export function setErrorHandling(exceptions: Exception[]): any {
    const useFiltersFn = UseFilters(new HttpExceptionFilter(exceptions));
    return function (target: any, key: string, des: any) {
        useFiltersFn(target, key, des);
        return target;
    };
}
