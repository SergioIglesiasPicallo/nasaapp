const express = require('express')
const bodyParser = require('body-parser')
const useroutes = require('./src/routes/user')
const apiroutes = require('./src/routes/sync-api')
const authRoutes = require('./src/routes/auth')
const dataroverRoutes = require('./src/routes/datarover')
const  {ensureAuthentication} = require ('./src/midleware/auth')
const sequelize = require('./src/services/db')
const dotenv = require('dotenv')



 dotenv.config()

const startApp = async () => {

    const app = express()
    const port = 8000
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))
  
    app.use(ensureAuthentication)
    app.use('/users', useroutes)
    app.use('/sync-api', apiroutes)
     app.use('/auth', authRoutes)
     app.use('/rovers', dataroverRoutes)

    try {
        await sequelize.sync({force: true})
        app.listen(port, () => {
            console.log('APP running on port ' + port)
        })
    } catch (error){
        console.log(error)
        process.exit(1)
        
    }

}

startApp()

