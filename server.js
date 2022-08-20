//REQUIREMENTS
const express = require(`express`)
const app = express()
const methodOverride = require(`method-override`)
const mongoose = require(`mongoose`)
const itemController = require(`./controllers/itemCtrl.js`)
const userController = require(`./controllers/userCtrl.js`)

const session = require(`express-session`)
require(`dotenv`).config()

const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI
const sessionSecret = process.env.SESSION_SECRET

//MONGO
mongoose.connect(mongoURI)
mongoose.connection.once(`open`, () => {
    console.log(`Connected to Mongo`)
})

//MIDDLEWARE
app.use(express.static(`public`))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride(`_method`))
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}))

app.use((req, res, next) => {
    res.locals.currentUser = req.session.currentUser
    next()
})

app.use(`/cart`, itemController)
app.use(`/users`, userController)

//PORT LISTENER
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!!!`)
})