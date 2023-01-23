const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const connectToDb = async () => {
    await mongoose.connect('mongodb://localhost:27017/datanasas_db')
    console.log('DB CONNECTED!!')
}

module.exports = connectToDb