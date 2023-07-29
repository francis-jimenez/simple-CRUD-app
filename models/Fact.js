const mongoose = require('mongoose')

const FactSchema = new mongoose.Schema({
  fact: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Fact', FactSchema)
