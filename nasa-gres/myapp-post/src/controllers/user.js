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
    return User.findOne({where:{email}})

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




 const toggleNasaToFavorite = async ({userId, roverId}) => {
     const user = await getUserById(userId)
     const currentFavList = user.roversFavs
    let newFavsList = currentFavList

    const existed = currentFavList.includes(taskId)

    if (existed) {
         newFavsList = currentFavList.filter(item => item === userId)
     } else {
        newFavsList.push(taskId)
     }

    await user.updateOne({tasksFavs: newFavsList})

    return getUserById(userId)
 }

module.exports = {
     getUsersList,
     getUserById,
    getUserByEmail,
     updateUser,
     removeUser,
     toggleNasaToFavorite
}