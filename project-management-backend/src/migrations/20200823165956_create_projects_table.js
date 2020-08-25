exports.up = function (knex) {
  return knex.schema.createTable('projects', (table) => {
    table.string('id').primary();
    table.string('title').unique().notNullable();
    table.string('project_manager').references('users.username');
    table.string('description');
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('projects');
};
