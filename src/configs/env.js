require('dotenv').config();

export const envVariable = {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || '123456',
  CLOUD_NAME: process.env.CLOUD_NAME || '',
  API_KEY_CLOUD: process.env.API_KEY_CLOUD || '',
  API_SECRET_CLOUD: process.env.API_SECRET_CLOUD || '',
  DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:namvippro23799@localhost:3306/test',
  EMAIL: process.env.EMAIL || '',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '',
};