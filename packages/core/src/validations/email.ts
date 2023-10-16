export enum EmailErrors {
  InvalidFormat = 'Invalid email format',
}

export const validateEmail = (email: string) => {
  const errors = [];

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!emailRegex.test(email)) {
    errors.push(EmailErrors.InvalidFormat);
  }

  return errors.length === 0 ? null : errors;
};
