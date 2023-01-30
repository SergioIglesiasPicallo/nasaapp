const Sequelize = require('sequelize')
const db = require('../services/db')

const userSchema = db.define('Schema', {
    name: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING,
        // autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        required: true,
        // unique: true,
        // lowercase: true,
        // trim: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
       
    },
    nasaFavs: {
        type: [String]
    },
     salt: {
        type: Sequelize.STRING,
         required: true
     }
})

//,{collection: 'users'});



module.exports = userSchema