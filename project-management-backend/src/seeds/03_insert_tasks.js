/**
 * Delete all existing entries and seed tasks table.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('tasks').insert([
    {
      id: '7e13a88e-207d-4c79-a9f0-770bee003266',
      title: 'some new task',
      description: 'This is an awesome project that will change everything',
      assigned_user: 'someone',
      associated_project: 'aa9765fe-0b3b-43a8-89d9-7bed86104195',
      deadline: '2020-09-08T18:15:00.000Z',
      created_at: new Date(),
    },
  ]);
};
