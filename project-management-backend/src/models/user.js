const bookshelf = require('../db.js');

const TABLE_NAME = 'users';

let User = bookshelf.model('User', {
  tableName: TABLE_NAME,
  hasTimestamps: true,

  managedProjects() {
    return this.hasMany('Project', 'project_manager', 'username');
  },

  previouslyAssignedTasks() {
    return this.hasMany('Task', 'previously_assigned_user', 'username');
  },

  assignedTasks() {
    return this.hasMany('Task', 'assigned_user', 'username');
  },

  projects() {
    return this.belongsToMany('Project');
  },

  tasks() {
    return this.belongsToMany('Task');
  },

  comments() {
    return this.hasMany('Comment', 'user', 'username');
  },
});

// /**
//  * User model.
//  */
// class User extends bookshelf.Model {
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

//   managedProjects() {
//     return this.hasMany('Project', 'project_manager', 'username');
//   }

//   assignedTasks() {
//     return this.hasMany('Task', 'assigned_user', 'username');
//   }

//   projects() {
//     return this.belongsToMany('Project');
//   }

//   tasks() {
//     return this.belongsToMany('Task');
//   }

//   get comments() {
//     return this.hasMany('Comment', 'user', 'username');
//   }
// }

module.exports = User;
