const bookshelf = require('../db.js');

const TABLE_NAME = 'comments';

let Comment = bookshelf.model('Comment', {
  tableName: TABLE_NAME,
  hasTimestamps: true,

  user() {
    return this.belongsTo('User', 'user', 'username');
  },

  task() {
    return this.belongsTo('Task', 'task', 'id');
  },
});

module.exports = Comment;
