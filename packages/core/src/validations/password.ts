export enum PasswordErrors {
  NoLowerCase = 'Password must contain at least one lowercase character',
  NoUpperCase = 'Password must contain at least one uppercase character',
  NoDigit = 'Password must contain at least one digit character',
  NoSpecialCharacter = 'Password must contain at least one special character',
  TooShort = 'Password must be at least 8 characters long',
}

export const validatePassword = (password: string) => {
  const errors = [];

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push(PasswordErrors.NoLowerCase);
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push(PasswordErrors.NoUpperCase);
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push(PasswordErrors.NoDigit);
  }

  if (!/(?=.*[!@#$%^&*()_+|~\-=`{}[\]:";'<>?,./])/.test(password)) {
    errors.push(PasswordErrors.NoSpecialCharacter);
  }

  if (!/^.{8,}$/.test(password)) {
    errors.push(PasswordErrors.TooShort);
  }

  return errors.length === 0 ? null : errors;
};
