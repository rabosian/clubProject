const { handle } = require('express/lib/application')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// error handlers
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: ''}

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'email is not registered'
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'password is incorrect'
    }    

    // duplicate user error handling using error code
    if (err.code === 11000) {
        errors.email = 'Email already exist'
        return errors
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
        // (Object)properties: {
        //     validator: [Function (anonymous)],
        //     message: 'Minimum password length is 6',
        //     type: 'minlength',
        //     minlength: 6,
        //     path: 'password',
        //     value: '123'
        //   }
    }
    return errors
}

         // == 3 days
const maxAge = 3 * 24 * 60 * 60

// id created when signup new User (DB)
const createToken = (id) => {
    return jwt.sign({ id }, 'secret string', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}
module.exports.login_get = (req, res) => {
    res.render('login')
}
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body
    // create new User in DB
    try { // create instance of User
        const user = await User.create({ email, password })
        const token =  createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
        
        // res.status(400).send('error, user not created')
        // OR
        // res.status(400).json({ message: err.message })
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        // create jwt
        const token =  createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})

        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.logout_get = (req, res) => {
    // delete jwt from cookie
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}