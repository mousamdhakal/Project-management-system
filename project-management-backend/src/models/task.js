const bookshelf = require('../db.js');

const TABLE_NAME = 'tasks';

let Task = bookshelf.model(
  'Task',
  {
    tableName: TABLE_NAME,
    hasTimestamps: true,

    project() {
      return this.belongsTo('Project', 'associated_project', 'id');
    },

    previousAssignedUser() {
      return this.belongsTo('User', 'previously_assigned_user', 'username');
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
  },
  { dependents: ['comments', 'taggedUsers'] }
);

module.exports = Task;
