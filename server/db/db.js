const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/image-repository', {
  logging: false,
});

module.exports = db;
