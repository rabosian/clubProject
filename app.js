require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

// middleware
app.use(express.static('public')) // public local folder 'public'
app.use(express.json()) // to use json parser
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

// DB connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(port)) // async
    .catch(err => console.log(err))
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to Database'))

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/clubs', requireAuth, (req, res) => res.render('clubs'));

app.use(authRoutes)

