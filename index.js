const http = require('http')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const obj = require('./obj')
const recipeRoutes = require('./routes/recipeRoutes')

// db connect
mongoose.connect(obj.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("----------------------------")
    console.log(" Listen to port => " + port._connectionKey)
    console.log(" *** Database connected *** ")
    console.log("----------------------------")
}).catch(err => console.log(err))

// validation data access transfert
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

const port = http.createServer(app).listen(8080)

app.use(recipeRoutes.routes)