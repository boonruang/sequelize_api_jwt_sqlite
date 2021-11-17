const Sequelize = require('sequelize');
const sequelize = require('../config/db');

var Contact = sequelize.define('contacts', {
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
  phone: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: 'users'
      },
      key: 'id'
    }
  }
});

(async () => {
  await Contact.sync();
})();

module.exports = Contact;
