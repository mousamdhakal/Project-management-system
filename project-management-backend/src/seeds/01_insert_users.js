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
      username: 'admin',
      first_name: 'Admin',
      last_name: 'Admin',
      password: '$2b$10$b9D0RyRKkrmPpScVc0RviODWmCYjJZ8hhJKyQW4SidpQ.BnFyRp.S',
      role: 'admin',
      created_at: new Date(),
    },
    {
      id: 'c9d37206-101a-4de9-933d-285faafe4be2',
      username: 'someone',
      first_name: 'secret',
      last_name: 'secret',
      role: 'projectmanager',
      password: '$2b$10$K9W/eGYMS2sOw7cLVSxlw.4WRHcwbmewerFOK9DrbVK//.LgPJPpe',
      created_at: new Date(),
    },
    {
      id: '2ab956f8-f134-4ac4-8b9d-486b10fc6b25',
      username: 'naya',
      first_name: 'new',
      last_name: 'new',
      role: 'engineer',
      password: '$2b$10$k74TJ49WCTJIfdtSGjvnauAmpLxPWQTalA6gdwhiw.g5vulkfTdzi',
      created_at: new Date(),
    },
    {
      id: '8b7410fc-53d3-45db-89b9-456969498f1f',
      username: 'neww',
      first_name: 'new',
      last_name: 'new',
      role: 'engineer',
      password: '$2b$10$Pu.CUvTxMP20XkXvqUclC.UeDdhs23Detl9/C5CsoadL94LndJByG',
      created_at: new Date(),
    },
  ]);
};
