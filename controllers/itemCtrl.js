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

//POST
router.post(`/`, (req, res) => {
    console.log(req.body)
    if (req.body.coupon === `on`) {
        req.body.coupon = true
    } else {
        req.body.coupon = false
    }
    if (req.body.outOfStock === `on`) {
        req.body.outOfStock = true
    } else {
        req.body.outOfStock = false
    }
    if (req.body.obtained === `on`) {
        req.body.obtained = true
    } else {
        req.body.obtained = false
    }
    Item.create(req.body, (err, createdItem) => {
        if(err) {
            console.log(err)
            res.send(err)
        } else{
            res.redirect(`/cart`)
        }
    })
})

//SHOW
router.get(`/:id`, (req, res) => {
    Item.findById(req.params.id, (err, foundItem) => {
        if(err) {
            res.send(err)
        } else {
            res.render(`show.ejs`, {
                item : foundItem
            })
        }
    })
})

//EDIT
router.get(`/:id/edit`, (req, res) => {
    Item.findById(req.params.id, (err, foundItem) => {
        res.render(`edit.ejs`, {
            item: foundItem
        })
    })
})

module.exports = router