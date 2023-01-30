const User = require ('../models/user')
 const bcrypt = require('bcrypt')
 const jsonwebtoken = require('jsonwebtoken')
const{getUserByEmail} = require('../controllers/user')
const salt = 10

const signup = async({email, password}) => {
     const existedUser = await getUserByEmail(email)

    if (existedUser) {
        throw new Error('User already in use')
     }

    // const salt = await bcrypt.genSalt(saltRounds)
    
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({email, password: hashedPassword,})
    await user.save()

        return jsonwebtoken.sing({email:user.email}, process.env.TOKEN_SECRET)
    
}

const login = async ({ email, password}) => {
    const user = await getUserByEmail (email)

    if (!user) {
        throw new Error('wrong user')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw new Error('wrong password')
    }

    return jsonwebtoken.sing({email: user.email}. process.env.TOKEN_SECRET)
}

module.exports = {
    signup,
    login
}