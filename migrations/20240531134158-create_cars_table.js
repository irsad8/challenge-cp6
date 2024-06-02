'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cars', { 
      uuid:{
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 100]
        }
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true,
        }
    },
    image:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
        }
    },
    userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true,
        }
    },
    is_deleted:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    updatedBy: {
        type: Sequelize.INTEGER
    },
    deletedBy:{
        type: Sequelize.INTEGER
    },
    createdBy:{
        type: Sequelize.INTEGER
    }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cars');
  }
};
