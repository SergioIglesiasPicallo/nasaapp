const Datanasa = require('../models/nasq')

const getDatanasaList = async () => {
    const nasa = await Datanasa.find(request.body)
    return nasa
}

const getDatanasaById = async () => {
    const nasa = await Datanasa.findById(request.body)
    return nasa
}

const createDatanasa = async ({ idNasa }) => {
    const nasa = new Datanasa({ idNasa })
    return nasa.save()
}

const updateDatanasa = async (id, data) => {
    const nasa = await getDatanasaById(id)
    await nasa.updateOne(data)

   
}

const removeDatanasa = async (id) => {
    await Datanasa.findByIdAndDelete(id)

    return true
}

module.exports = {
    getDatanasaList,
    getDatanasaById,
    createDatanasa,
    updateDatanasa,
    removeDatanasa
}