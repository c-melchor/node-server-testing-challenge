exports.seed = function (knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        { username: 'name1', email: "me@email.com" },
        { username: 'name2', email: "you@email.com" },
        { username: 'name3', email: "e@email.com" }
      ]);
    });
};
