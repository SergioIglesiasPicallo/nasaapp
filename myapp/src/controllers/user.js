const User = require('../models/user')

const getUsersList = async () => {
    const users = await User.find()
    return users
}

const getUserById = async (id) => {
    const user = await User.findById(id)
    return user
}

const getUserByEmail = async (email) =>{
    const user = new User ({ email})
    return user
}
const createUser = async ({ name, email, password }) => {
    const user = new User({ name, email, password })
    const test = await user.save()
    return test
}

const updateUser = async (id, data) => {
    const user = await getUserById(id)
    await user.updateOne(data)
    return getUserById(id)

}

const removeUser = async (id) => {
    await User.findByIdAndDelete(id)

    return true
}

module.exports = {
    getUsersList,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    removeUser
}