const Sequelize = require('sequelize');

var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

(async () => {
  await sequelize.authenticate();
})();

module.exports = sequelize;
