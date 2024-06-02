'use strict';
const { v4: uuidv4 } = require("uuid");
const argon2 = require('argon2');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const passwordHash = await argon2.hash('123456');
    return queryInterface.bulkInsert('users', [
      {
        uuid: uuidv4(),
        name: 'admin',
        email: 'admin@gmail.com',
        password: passwordHash,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
