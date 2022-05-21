export const config = {
  // MongoDB connection string:
  mongodb_uri:
    process.env.NODE_ENV === 'production'
      ? ''
      : 'mongodb://localhost/nestjs-dev-db',

  // user auth-jwt secrets
  user_jwt_secret:
    process.env.NODE_ENV === 'production'
      ? ''
      : '(HE*9iheu9iae98h(EFiefisrhfse9ihe938349',
};
