import express from 'express';
import createError from 'http-errors';
import cors from 'cors';
const morgan = require('morgan');
import { envVariable } from "./configs/env";
import { logger } from './utils';
import models from './models';

import { userRouter } from './routers';

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '20mb', parameterLimit: 100 }));


global.logger = logger;

(async function startServer() {
  try {
    const db = await models();
    app.db = db;

    app.use('/api/v1/users', userRouter({ db }));

    app.use('/', function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use('/', function (err, req, res, next) {
      res.status(err.status || 500).json({
        message: err.message,
        status: err.status || 500,
        ok: false
      });
    });

    await app.listen(envVariable.PORT, () => {
      logger.info(`Server is running on port ${envVariable.PORT}`);
    });

  } catch (error) {
    logger.error(error);
  }
})()
