const bookshelf = require('../db.js');

const TABLE_NAME = 'tasks';

let Task = bookshelf.model('Task', {
  tableName: TABLE_NAME,
  hasTimestamps: true,

  project() {
    return this.belongsTo('Project', 'associated_project', 'id');
  },

  assignedUser() {
    return this.belongsTo('User', 'assigned_user', 'username');
  },

  taggedUsers() {
    return this.belongsToMany('User');
  },

  comments() {
    return this.hasMany('Comment', 'task', 'id');
  },
});

// /**
//  * Task model.
//  */
// class Task extends bookshelf.Model {
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

//   get project() {
//     return this.belongsTo(Project, 'associated_project', 'id');
//   }

//   get assignedUser() {
//     this.belongsTo(User, 'assigned_user', 'username');
//   }

//   get users() {
//     this.belongsToMany(User);
//   }

//   get comments() {
//     this.hasMany(Comment, 'task', 'id');
//   }
// }

module.exports = Task;
