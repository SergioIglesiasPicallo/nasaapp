const mongoose = require('mongoose')

const nasaSquema = new mongoose.Schema({

    idNasa: {
        type: Number,
        required: true
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
const Datanasa = mongoose.model("Datanasa", nasaSquema)
module.exports = Datanasa