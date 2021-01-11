const Sequelize = require('sequelize');
module.exports = new Sequelize('postgres://localhost:5432/image-repository', {
  logging: false,
});

require('./models');
