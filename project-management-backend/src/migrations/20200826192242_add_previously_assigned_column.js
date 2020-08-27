exports.up = function (knex) {
  return knex.schema.table('tasks', (table) => {
    table.string('previously_assigned_user').references('users.username');
  });
};

exports.down = function (knex) {
  return knex.schema.table('tasks', (table) => {
    table.dropColumn('previously_assigned_user');
  });
};
