const User = require ('../models/user')
 const bcrypt = require('bcrypt')

const{getUserByEmail} = require('../controllers/user')
const saltRounds = 10

const signup = async({email, password}) => {
    const existedUser = await getUserByEmail(email)

    if (existedUser) {
        throw new Error('User already in use')
    }

    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({email, password: hashedPassword, salt})
    await user.save()

        return jsonwebtoken.sing({email:user.email}, process.env.TOKEN_SECRET)
    
}

const login = async ({ email, password}) => {
    const user = await getUserByEmail (email)

    if (!user) {
        throw new Error('wrong password')
    }
    const match = await bcrypt.compare(password, user.password)

    return jsonwebtoken.sing({email: user.email}. process.env.TOKEN_SECRET)
}

module.exports = {
    signup,
    login
}