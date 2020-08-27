/**
 * Delete all existing entries and seed users table.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('projects').insert([
    {
      id: 'aa9765fe-0b3b-43a8-89d9-7bed86104195',
      title: 'some nsddsew project',
      project_manager: 'someone',
      description: 'This is an awesome project that will change everything',
      created_at: new Date(),
      users: ['c9d37206-101a-4de9-933d-285faafe4be2', 'ac749aa6-4e06-48f5-85a8-b9342994b251'],
    },
  ]);
};
