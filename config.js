module.exports = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/apollo-graphql',
  JWT_KEY: process.env.JWT_KEY || 'dwAWedGFd32GJKG23Dfgt568edFDsrswOl876gGtTer',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};
