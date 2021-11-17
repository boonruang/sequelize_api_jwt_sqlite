const Sequelize = require('sequelize');
const sequelize = require('../config/db');

var User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(150),
    allowNull: false
  }
});

(async () => {
  await User.sync();
})();

module.exports = User;
