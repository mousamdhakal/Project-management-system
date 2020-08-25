exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.string('id').primary();
    table.string('title').notNullable();
    table.string('description');
    table.string('assigned_user').references('users.username');
    table.string('associated_project').references('projects.id');
    table.date('deadline');
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tasks');
};
