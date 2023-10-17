const mongoose = require('mongoose')
const slugify = require('slugify')

const siteSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, 'URL cannot be empty!'],
        unique: true,
        trim: true
    }

})



// capital for connvention that its a model
const Site = mongoose.model('Site', siteSchema) 

module.exports = Site