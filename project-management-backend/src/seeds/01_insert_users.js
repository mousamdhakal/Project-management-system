/**
 * Delete all existing entries and seed users table.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('users').insert([
    {
      id: 'ac749aa6-4e06-48f5-85a8-b9342994b251',
      username: 'mousam',
      first_name: 'Mousam',
      last_name: 'Dhakal',
      password: '$2b$10$b9D0RyRKkrmPpScVc0RviODWmCYjJZ8hhJKyQW4SidpQ.BnFyRp.S',
      role: 'admin',
      created_at: new Date(),
    },
  ]);
};
