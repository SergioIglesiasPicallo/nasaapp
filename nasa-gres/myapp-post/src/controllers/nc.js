const Datarover = require('../models/nasq')
const { options } = require('../services/db')


const getDataroverList = async () => {
    const nasa = await Datarover.findALL()
    return nasa
}

const getDataroverById = async () => {
    const nasa = await Datarover.findByPK(request.body)
    return nasa
}

const createDatarover = async ({ idNasa }) => {
    const nasa = await Datarover.create(values={ idNasa })//raro el values,debdería ser values:
    return nasa
}

const updateDatarover = async (id, data) => {
    const nasa = await nasa.update(data, {
        where: {
            id
        }
    })
   
    return nasa

   
}

const removeDatarover = async (id) => {
    await Datarover.destroy(options={  //lomismo que values
        where: {
            id
        }
    })

    return true
}

module.exports = {
    getDataroverList,
    getDataroverById,
    createDatarover,
    updateDatarover,
    removeDatarover
}