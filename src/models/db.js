import { Sequelize } from 'sequelize';

import { envVariable } from "../configs/env";
const { DATABASE_URL } = envVariable;

export const sequelize = new Sequelize(DATABASE_URL, {
  define: {
    timestamps: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});