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

/**
 * Comment model.
 */
// class Comment extends bookshelf.Model {
//   /**
//    * Get table name.
//    */
//   get tableName() {
//     return TABLE_NAME;
//   }

//   /**
//    * Table has timestamps.
//    */
//   get hasTimestamps() {
//     return true;
//   }

//   get user() {
//     this.belongsTo('User', 'user', 'username');
//   }

//   get task() {
//     this.belongsTo('Task', 'task', 'id');
//   }
// }

module.exports = Comment;
