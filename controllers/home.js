const Fact = require('../models/Fact')

module.exports = {
    getIndex: async (req, res) => {
        try {
            const catFacts = await Fact.find()
            res.render('index.ejs', {fact: catFacts})  
        } catch(err) {
            console.log(err)
        }
    },
    getFacts: async (req, res) => {
        try {
            const catFacts = await Fact.find()
            res.json(catFacts)
        } catch(err) {
            console.log(err)
        }
    },
    createFact: async (req, res) => {
        try {
            await Fact.create({fact: req.body.fact})
            console.log(req.body)
            res.redirect('/')
        } catch (err) {
            console.log(err)
        }
    },
    deleteFact: async (req, res) => {
        try {
            await Fact.findOneAndDelete({fact: req.body.itemFromJS})
            console.log('Fact Deleted')
            res.json('Fact Deleted')
        } catch (err) {
            console.log(err)
        }
    }
}

// app.get('/', async (req, res) => {
//     const catFacts = await quotesCollection.find().toArray()
//     res.render('index.ejs', {fact: catFacts})                
// })

// app.get('/api', async(req, res) => {
//     const catFacts = await quotesCollection.find().toArray()
//     res.json(catFacts)     
// })

// app.post('/newFact', (req, res) => {
//     quotesCollection.insertOne({fact: req.body.fact})
//       .then(result => {
//         console.log(req.body)
//         res.redirect('/')
//       })
//       .catch(error => console.error(error))
//   }) 

//   app.delete('/deleteItem', (request, response) => {
//     quotesCollection.deleteOne({fact: request.body.itemFromJS})
//     .then(result => {
//         console.log('Fact Deleted')
//         response.json('Fact Deleted')
//     }) 
//     .catch(error => console.error(error))
     
// })