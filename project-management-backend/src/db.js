const knexJs = require('knex');
const bookshelfJs = require('bookshelf');

const knexConfig = require('./knexfile.js');

/**
 * Database connection.
 */
const knex = knexJs(knexConfig);
const bookshelf = bookshelfJs(knex);

module.exports = bookshelf;
