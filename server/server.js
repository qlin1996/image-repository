require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const db = require('./db');
db.sync()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error:' + err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.listen(port, () => console.log(`Listening on port ${port}`));
