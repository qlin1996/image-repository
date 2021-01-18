require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

const db = require('./db');
db.sync()
  .then(() => console.log('Database connected...'))
  .catch((error) => console.log('Error:' + error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.listen(port, () => console.log(`Listening on port ${port}`));
