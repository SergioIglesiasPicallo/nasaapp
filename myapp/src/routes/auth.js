const { singup, login } = require("../controllers/auth");
const router = require('express').Router()

router.post('/singup', async (request, response) => {
try {
    console.log(request.body)
    const {email, password} = request.body
    if(!email || !password) {
      return response.status(502).json(error.message)

    }

    const token = await singup({ email, password})
   return response.status(200),json(token)

}   catch (error){
    return response.status(500).json(error.message)
}
})

router.post('/login', async(request, response) => {
    try {
        const {email, password} = request.body
        if (!email || !password) {
        return response.status(502).json('wrong data')
    }

    const token = await login({email, password})
    return response.status(200).json(token)
} catch (error){
    response.status(500).json(error.message)
}
})

module.exports =router