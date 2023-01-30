const router = require('express').Router()
const {getDataroverList, getDataroverById, createDatarover, removeDatarover,updateDatarover} = require('../controllers/nc')

router.get('/', async (req, response) => {
    try {
        const data = await getDataroverList()
        response.status(200).json(data)
    } catch (error) {
        response.status(500)
    }
})
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const user = await getDataroverById(id)
        response.status(200).json(user)
    } catch (error) {
        response.status(500)
    }
})
router.post('/', async (request, response) => {
    try {
        const data = request.body
        console.log(data)
        const user = await createDatarover(data)
        response.status(200).json(user)
    } catch (error) {
        response.status(500).json(error)
    }
})

router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const data = request.body
        const user = await updateDatarover(id, data)
        response.status(200).json(user)
    } catch (error) {
        response.status(500)
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        await removeDatarover(id)
        response.status(200).json(true)
    } catch (error) {
        response.status(500)
    }
})


module.exports = router











