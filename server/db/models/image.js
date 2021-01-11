const Sequelize = require('sequelize');
const db = require('../db');

const Image = db.define('image', {
  fileLink: {
    type: Sequelize.TEXT,
  },
  title: {
    type: Sequelize.STRING,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = Image;
