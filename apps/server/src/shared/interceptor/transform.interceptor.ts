import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  result: T;
  code: number;
  message: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  // ExecutionContext扩展了ArgumentsHost,提供额外的当前运行线程信息
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data) => {
        const logFormat = `
        Request original url: ${req.originalUrl}
        Method: ${req.method}
        IP: ${req.ip}
        User: ${JSON.stringify(req.user)}
        Response data: ${JSON.stringify(data)}
      `;
        Logger.log(req.url, '正常接口请求');

        return {
          result: data,
          code: 0,
          message: 'success',
        };
      }),
    );
    // return next.handle().pipe(map(data => ({ data })));
  }
}
