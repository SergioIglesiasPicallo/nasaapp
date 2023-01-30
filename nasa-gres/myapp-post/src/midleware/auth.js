const jsonwebtoken = require ('jsonwebtoken')
const User = require('../models/user')

const ensureAuthentication = async ( request, response, next) => {
  
    if( request.path.includes('/auth')){
        return next()
    }
    if(!request.headers.authorization) { //areglar values
        
    }
    const token = request.headers.authorization.split(separator="")[1]

request.user = jsonwebtoken.decode(token, process.env.TOKEN_SECRET)

    if (!token) {
        return response.status(403).json('token incorrect')
    }
    const payload = jsonwebtoken.decode(token, process.env.TOKEN_SECRET)

    if(!payload || !payload.email) {
        return response.status(403).json('token incorrect')
    }

    const user = await User.findOne({email:payload.email})
    if(!user) {
        return response.status(403).json('token incorrect')
    }
    request.user= {id: user.id, email : user.email}
    
    next()
}

module.exports = {
    ensureAuthentication
}