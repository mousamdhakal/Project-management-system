require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const json = require('./middlewares/json');
const { bodyParserHandler, genericErrorHandler, notFoundHandler } = require('./middlewares/errorHandlers');
const routes = require('./routes.js');

let app = express();

app.use(cors());
app.use(morgan('dev'));

// parse incoming JSON data and check for errors
app.use(express.json());
app.use(bodyParserHandler);
app.use(json);

app.use('/api', routes);

// Error middlewares to handle errors
app.use(genericErrorHandler);
app.use(notFoundHandler);

app.listen(process.env.PORT, () => {
  console.log('Server running on', process.env.PORT);
});
