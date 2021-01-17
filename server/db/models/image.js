const Sequelize = require('sequelize');
const db = require('../db');

const Image = db.define('image', {
  fileLink: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = Image;
