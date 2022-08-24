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

//INDEX
router.get(`/`, (req, res) => {
    Item.find({}, (err, allItems) => {
        res.render(`index.ejs`, {
            items: allItems
        })
    })
})

//NEW
router.get(`/new`, (req, res) => {
    res.render(`new.ejs`)
})

module.exports = router