const mongoose = require(`mongoose`)

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: String,
    qty: Number,
    price: Number,
    priority: Number,
    coupon: Boolean,
    outOfStock: Boolean,
    obtained: Boolean,
    comment: String,
    img: String
})

const Item = mongoose.model(`Item`, itemSchema)

module.exports = Item