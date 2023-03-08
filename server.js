const express = require('express') //getting access to express
const app = express() //using express
const MongoClient = require('mongodb').MongoClient
const PORT = 2121 //setting local port number
require('dotenv').config() //setting private env files

let db, //directing conection to database to env file
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'catFact' //db name

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //connecting to database and getting comfirmation.
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

    app.set('view engine', 'ejs') //setting view engine
    app.use(express.static('public')) //accesing public folders
    app.use(express.urlencoded({extended : true})) //setting body parser
    app.use(express.json()) //getting access to json

    //main
    app.get('/' , async (req, res) => {
        const catFacts = await db.collection('facts').find().toArray()
        res.render('index.ejs', {fact: catFacts})
        console.log(catFacts)
    })

    app.get('/fact' , async (req, res) => {
        const catFacts = await db.collection('facts').find().toArray()
        res.send(catFacts)
        console.log(catFacts)
    })

    app.post('/newFact', async (req, res)=> {
        console.log('asdasd')
    })

    app.listen(PORT, () => {
        console.log('SERVER UP')
    })