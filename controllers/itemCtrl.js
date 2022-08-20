const express = require(`express`)
const router = express.Router()
const Item = require(`../models/items.js`)

const authRequired = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.send(`You must be logged in to do that!`)
    }
}

module.exports = router