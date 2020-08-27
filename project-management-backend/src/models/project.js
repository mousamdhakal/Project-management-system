const bookshelf = require('../db.js');

const TABLE_NAME = 'projects';

let Project = bookshelf.model(
  'Project',
  {
    tableName: TABLE_NAME,
    hasTimestamps: true,

    projectManager() {
      return this.belongsTo('User', 'project_manager', 'username');
    },

    tasks() {
      return this.hasMany('Task', 'associated_project', 'id');
    },

    users() {
      return this.belongsToMany('User');
    },
  },
  { dependents: ['tasks', 'users'] }
);

/**
 * Project model.
 */
// class Project extends bookshelf.Model {
//   /**
//    * Get table name.
//    */
//   get tableName() {
//     return TABLE_NAME;
//   }

//   /**
//    * Table has timestamps.
//    */
//   hasTimestamps() {
//     return true;
//   }

//   projectManager() {
//     return this.belongsTo(User, 'project_manager', 'username');
//   }

//   tasks() {
//     return this.hasMany(Task, 'associated_project', 'id');
//   }

//   users() {
//     return this.belongsToMany(User);
//   }
// }

module.exports = Project;
