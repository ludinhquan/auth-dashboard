export const validateEnvs = (
  envs: Record<string, string>,
): Record<string, string> => {
  const missingEnvKeys = [
    'DATABASE_URL',

    'AUTH0_DOMAIN',

    'CLIENT_URL',
    'SERVER_URL',

    'JWT_ACCESS_TOKEN_SECRET',
    'JWT_ACCESS_TOKEN_EXPIRATION_TIME',

    'JWT_REFRESH_TOKEN_SECRET',
    'JWT_REFRESH_TOKEN_EXPIRATION_TIME',

    'JWT_VERIFICATION_TOKEN_SECRET',
    'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',

    'EMAIL_VERIFICATION_URL',
    'EMAIL_VERIFICATION_TIME_RESEND',
  ].filter((key) => !envs[key]);

  if (missingEnvKeys.length > 0)
    throw new Error(`Missing config env keys ${missingEnvKeys}`);

  return envs;
};
