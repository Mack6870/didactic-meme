const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    // credentials are loaded from env or IAM role automatically
  },
  db: {
    mongoUri: process.env.MONGODB_URI,
    postgresUri: process.env.POSTGRES_URI,
    dynamoTablePrefix: process.env.DYNAMODB_TABLE_PREFIX || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
};

module.exports = config;
