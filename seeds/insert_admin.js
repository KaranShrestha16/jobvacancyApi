const bcrypt= require('bcrypt');
const hashedPassword = bcrypt.hashSync('Admin@1234', 10);
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'admin',email:'admin@gmail.com',password:hashedPassword,user_type:'Admin'}
     
      ]);
    });
};
