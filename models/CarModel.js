const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Users = require('./UserModel');

const Cars = db.define('cars', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [3, 100]
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true,
        }
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true,
        }
    },
    is_deleted:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    updatedBy: {
        type: DataTypes.INTEGER
    },
    deletedBy:{
        type: DataTypes.INTEGER
    },
    createdBy:{
        type: DataTypes.INTEGER
    }
    
},{
    freezeTableName:true
});

Users.hasMany(Cars);
Cars.belongsTo(Users, {foreignKey:'userId'});
Cars.belongsTo(Users, {foreignKey:'updatedBy', as: "updatedByUser"});
Cars.belongsTo(Users, {foreignKey:'deletedBy', as: "deletedByUser"});
Cars.belongsTo(Users, {foreignKey:'createdBy', as: "createdByUser"});

module.exports = Cars; 