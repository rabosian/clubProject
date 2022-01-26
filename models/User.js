const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email format']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Minimum password length is 6']
    },
})

// call the function before doc saved to DB (hashing)
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// static method to login user
userSchema.statics.login = async function(email, password) {
            // shorten form of { email: email } cuz name is same
    const user = await this.findOne({ email }) // this == user model
    if (user) { // if user exist -> compare password
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

// model name HAS TO BE a SINGULAR of db collection name (users => user)
const User = mongoose.model('user', userSchema)
module.exports = User

// OR
// module.exports = mongoose.model('User', userSchema)