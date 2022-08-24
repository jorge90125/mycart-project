const mongoose = require(`mongoose`)

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: String,
    qty: Number,
    price: Number,
    priority: Number,
    coupon: Boolean,
    comment: String,
    outOfStock: Boolean,
    obtained: Boolean,
    img: String
})

const Item = mongoose.model(`Item`, itemSchema)

module.exports = Item