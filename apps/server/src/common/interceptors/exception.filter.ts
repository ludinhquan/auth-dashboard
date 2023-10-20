import { CustomError, InternalServerError, UnauthorizedError } from '@lib/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException, CustomError)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(this.constructor.name);

  formatMessage(e: unknown) {
    return JSON.stringify(e);
  }

  catch(exception: CustomError | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let error: CustomError;
    switch (true) {
      case exception instanceof UnauthorizedException:
        error = new UnauthorizedError(exception.message);
        break;
      case exception instanceof CustomError:
        error = exception as CustomError;
        break;
      default:
        this.logger.warn(`Please implements error for ${exception.name}`);
        error = new InternalServerError(exception.message);
    }

    this.logger.error(this.formatMessage(error.toJson()));

    response.status(error.statusCode).json(error.toJson());
  }
}
