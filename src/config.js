const jwt_config = {
  expiresIn: 365 * 24 * 60 * 60,
  issuer: "auth_api",
  jwtid: "auth-id",
  subject: "auth-access-token",
};

module.exports = {
  PORT: 8080,
  JWT_SECRET: "auth",
  JWT_CONFIG: jwt_config,
};
