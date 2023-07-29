const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')

router.get('/', homeController.getIndex)

router.get('/api', homeController.getFacts)

router.post('/createFact', homeController.createFact)

router.delete('/deleteItem', homeController.deleteFact)

module.exports = router