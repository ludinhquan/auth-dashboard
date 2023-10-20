import { CustomError } from '@lib/core';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  private logger = new Logger(this.constructor.name);

  getClient(request: Request) {
    const { ip, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    return [decodeURIComponent(originalUrl), userAgent, ip].join(' ');
  }

  intercept(context: ExecutionContext, handler: CallHandler) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const last = performance.now();

    const { method, params, query } = request;

    const client = this.getClient(request);

    this.logger.log(
      `[REQUEST][${method}] ${client} ${JSON.stringify({ params, query })}`,
    );

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      let log = this.logger.log.bind(this.logger);
      if (statusCode >= 400) log = this.logger.error.bind(this.logger);

      log(
        `[RESPONSE][${method}] ${client} status:${statusCode}, length: ${
          contentLength ?? 0
        }, duration: ${performance.now() - last}ms`,
      );
    });

    return handler.handle().pipe(
      map((data: unknown) => {
        if (data instanceof CustomError) {
          response.status(data.statusCode);
          return data.toJson();
        }

        return data;
      }),
    );
  }
}
