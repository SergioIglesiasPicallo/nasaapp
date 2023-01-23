
const User = require('../models/user')

const ensureAuthentication = async ( request, response, next) => {
    if(!request.path.includes ('/auth')) {
        return next()
    }
    const token = request.headers.authorization.split("")[1]

    if (!token) {
        return response.status(403).json('token incorrect')
    }
    const payload = jasonwebtoken.decode(token, process.env.TOKEN_SECRET)

    if(!payload || !payload.email) {
        return response.status(403).json('token incorrect')
    }
    const user = await User.findOne({email:payload.email})
    if(!user) {
        return response.status(403).json('token incorrect')
    }
    request.user= {id: user._id, email : user.email}
    next()
}

module.exports = {
    ensureAuthentication
}