const mongoose = require('mongoose')

const weatherSchema = mongoose.Schema({
    uid: { type: String },
    city: { type: String },
    temp: { type: String },
    description: { type: String },
    icon: { type: String },
    country: { type: String }

})

module.exports = mongoose.model('Weather', weatherSchema)