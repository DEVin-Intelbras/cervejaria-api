import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from './nest-response';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((responseFromController: NestResponse) => {
        if (responseFromController instanceof NestResponse) {
          const contextHttp = context.switchToHttp();
          const response = contextHttp.getResponse();
          const { status, headers, body } = responseFromController;

          // {
          //   "X-Owned": "teste",
          //   "X-Version": "teste2"
          // }
          // ["header1", "header2"]
          //headers[X-Owned] = teste
          const headerNames = Object.getOwnPropertyNames(headers);
          headerNames.forEach((header) => {
            const value = headers[header];
            this.httpAdapter.setHeader(response, header, value);
          });

          this.httpAdapter.status(response, status);

          return body;
        }
        return responseFromController;
      }),
    );
  }
}
