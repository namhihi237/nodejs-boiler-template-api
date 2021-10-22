import Sequelize from 'sequelize';
import fs from 'fs';

import { sequelize } from './db.js';

export default () => {
  let db = {};
  const MODEL_PATH = './src/models';

  return new Promise((resolved, reject) => {
    fs.readdir(MODEL_PATH, async (err, files) => {
      if (err) {
        reject(err);
      } else {
        // fetch all files in models folder
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'db.js' && file.slice(-3) === '.js') {
            let model = await import(`./${file}`);
            model = model.default;
            db[model.tableName] = model;
          }
        }

        // make constrain for model
        Object.keys(db).forEach(modelName => {
          if ('associate' in db[modelName]) {
            db[modelName].associate(db);
          }
        });

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
        db.Op = Sequelize.Op;
        resolved(db);
      }
    });
  });
};