const knexJs = require('knex');
const bookshelfJs = require('bookshelf');
var cascadeDelete = require('bookshelf-cascade-delete');

const knexConfig = require('./knexfile.js');

/**
 * Database connection.
 */
const knex = knexJs(knexConfig);
const bookshelf = bookshelfJs(knex);
bookshelf.plugin(cascadeDelete);

module.exports = bookshelf;
