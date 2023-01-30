const router = require('express').Router();
const apising = require('../services/api');


router.get('/', async (response) => {
    try {
        const nasaApi = await apising()
        console.log(nasaApi.length);
        response.status(200).json(nasaApi)
    } catch (error) {
        response.status(500).json(500)
    }
});

module.exports = router;