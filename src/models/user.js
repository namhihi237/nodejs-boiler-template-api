import Sequelize from 'sequelize';
import { sequelize } from './db.js';

const User = sequelize.define('User', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  email: {
    type: Sequelize.STRING(200),
    allowNull: true,
    validate: {
      len: [0, 200]
    }
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: true,
    validate: {
      len: [0, 100]
    }
  },
  fullName: {
    type: Sequelize.STRING(100),
    allowNull: true,
    validate: {
      len: [0, 100]
    }
  },
  role: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      len: [0, 50]
    },
    defaultValue: 'user'
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
 
  
});

User.associate = models => {
 
}
export default User;