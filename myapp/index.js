const express = require('express')
const bodyParser = require('body-parser')
const useroutes = require('./src/routes/user')
const apiroutes = require('./src/routes/sync-api')
 const authRoutes = require('./src/routes/auth')
 const {controlAuthentication} = require ('./src/midleware/auth')
const connectToDb = require('./src/services/db')




// Dotenv.config()

const startApp = async () => {

    const app = express()
    const port = 8000
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended: true
    }))
  
    app.use(controlAuthentication)
    app.use('/users', useroutes)
    app.use('/sync-api', apiroutes)
     app.use('/auth', authRoutes)

    try {
        await connectToDb()
        app.listen(port, () => {
            console.log('APP running on port ' + port)
        })
    } catch (error){
        console.log(error)
        process.exit(1)
        
    }

}

startApp()

