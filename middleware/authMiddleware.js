const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    // check jwt exists & is verified (valid)
    if (token) {
        jwt.verify(token, 'secret string', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            } else { // is valid token
                console.log(decodedToken)
                next() // let carry on next middleware
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'secret string', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }
    else {
        res.locals.user = null
        next()
    }
}


module.exports = { requireAuth, checkUser }