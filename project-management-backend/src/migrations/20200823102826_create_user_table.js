exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.string('username').unique().notNullable();
    table.string('first_name').notNullable();
    table.string('last_name');
    table.string('role').defaultTo('engineer');
    table.string('password').notNullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
