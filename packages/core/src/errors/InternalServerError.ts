import { CustomError, ErrorDescription } from './CustomError';

export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(private error: any) {
    super(error ?? 'Internal server error');

    console.error(error);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  private getErrorMessage() {
    if (this.error instanceof Error) return this.error.message;
    return this.error;
  }

  private getErrorType() {
    return this.error instanceof Error
      ? this.error.constructor.name
      : 'UnknownError';
  }

  private getErrorDetail() {
    return this.error instanceof Error ? this.error.stack : '';
  }

  serializeErrors() {
    const type = this.getErrorType();
    const message = this.getErrorMessage();
    const detail = this.getErrorDetail();
    const error: ErrorDescription = { type, message, detail };
    return [error];
  }
}
