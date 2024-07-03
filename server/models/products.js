const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    product: {
        type: Object,
        required: true,
    },
})

module.exports = mongoose.model('Product', productSchema)