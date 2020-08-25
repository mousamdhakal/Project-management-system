exports.up = function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.string('id').primary();
    table.string('text').notNullable();
    table.string('user').references('users.username');
    table.string('task').references('tasks.id');
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('comments');
};
