const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const Product =  model('Product', productSchema) 

module.exports  = Product