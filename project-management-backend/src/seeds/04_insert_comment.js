/**
 * Delete all existing entries and seed comments table.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('comments').insert([
    {
      id: '4bf5e779-c96f-4b1b-9ea5-63243208e38f',
      text: 'This is an awesome comment',
      user: 'someone',
      task: '7e13a88e-207d-4c79-a9f0-770bee003266',
      created_at: '2020-08-24T07:10:56.527Z',
    },
  ]);
};
