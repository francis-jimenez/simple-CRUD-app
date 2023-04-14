const express = require('express') //getting access to express
const app = express() //using express
const MongoClient = require('mongodb').MongoClient
const PORT = 2121 //setting local port number
require('dotenv').config() //setting private env files

let db,
    quotesCollection, //directing conection to database to env file
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'catFact' //db name

    MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) //connecting to database and getting comfirmation.
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        quotesCollection = db.collection('facts')
    })
        // Move route handlers and any code that needs to access `db` inside this block
        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(express.urlencoded({extended : true}))
        app.use(express.json())

        app.get('/', async (req, res) => {
            const catFacts = await db.collection('facts').find().toArray()
            res.render('index.ejs', {fact: catFacts})
            console.log(catFacts)
        })

        app.get('/fact', async (req, res) => {
            const catFacts = await db.collection('facts').find().toArray()
            res.send(catFacts)
            console.log(catFacts);
        })

        app.post('/newFact', (req, res) => {
            quotesCollection.insertOne(req.body)
              .then(result => {
                console.log(result)
                location.reload()
              })
              .catch(error => console.error(error))
          })

        app.delete('/deleteFact', (req, res) => {
            quotesCollection.deleteOne(req.body)
        })

        app.listen(PORT, () => {
            console.log('SERVER UP')
        })