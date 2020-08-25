exports.up = function (knex) {
  return knex.schema.createTable('tasks_users', (table) => {
    table.string('user_id').references('users.id');
    table.string('task_id').references('tasks.id');
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tasks_users');
};
