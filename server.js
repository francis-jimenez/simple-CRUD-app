const express = require('express') //getting access to express
const app = express() //using express
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const cors = require('cors')
require('dotenv').config({path: './config/.env'}) //setting private env files

connectDB()


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

app.use('/', homeRoutes)

app.listen(process.env.PORT || PORT, () => {
    console.log('SERVER UP') 
})