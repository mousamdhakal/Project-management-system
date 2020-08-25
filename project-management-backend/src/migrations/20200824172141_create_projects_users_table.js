exports.up = function (knex) {
  return knex.schema.createTable('projects_users', (table) => {
    table.string('user_id').references('users.id');
    table.string('project_id').references('projects.id');
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('projects_users');
};
