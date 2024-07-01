const mongoose = require('mongoose')
const bcrpyt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

// mongoose will enforce this schema so the title has to be a string
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method

userSchema.statics.signup = async function(email, firstName, lastName, password) {

    if(!validator.isEmail(email)) {
        throw Error('Enter a valid email')
    }

    const normalizedEmail = email.toLowerCase()

    const exists = await this.findOne({ email: normalizedEmail })

    if(exists){
        throw Error('An account exists for this email address. Enter a different address.')
    }

    const salt = await bcrpyt.genSalt(10)
    const hash = await bcrpyt.hash(password, salt)

    const user = await this.create({ email, firstName, lastName, password: hash })

    return user
}

// static login method

userSchema.statics.login = async function(email, password){

    const user = await this.findOne({ email })

    if(!user){
        throw Error('Your email address or password is incorrect.')
    }

    const match = await bcrpyt.compare(password, user.password)

    if(!match){
        throw Error('Your email address or password is incorrect.')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)