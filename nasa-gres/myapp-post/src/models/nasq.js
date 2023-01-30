const sequelize = require('sequelize')
const db = require('../services/db')

const nasaSquema = db.define('Schema', {

    idNasa: {
        type: sequelize.NUMBER, //string uuid buscar
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    camera: {
        type: String,
    },
    img_src: {
        type: String,
    },
    earth_date: {
        type: String,
    }
})

module.exports = nasaSquema