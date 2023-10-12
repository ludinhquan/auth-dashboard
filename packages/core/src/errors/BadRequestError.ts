import { CustomError } from './CustomError';

export class BadRequestError extends CustomError {
  statusCode = 422;

  constructor(
    public message: string | string[],
    public data?: any,
  ) {
    super('Bad Request');

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    const errors =
      typeof this.message === 'string' ? [this.message] : this.message;

    if (Array.isArray(errors))
      return errors.map((error) => ({ message: error, data: this.data }));

    return [{ message: errors as string, data: this.data }];
  }
}
