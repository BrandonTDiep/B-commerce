const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}


module.exports = {
    // login user
    loginUser: async (req, res) => {
        const {email, password} = req.body

        try{
            // calls the login method in my User Model
            const user = await User.login(email, password)
            const firstName = user.firstName

            // create a token
            const token = createToken(user._id)

            res.status(200).json({email, firstName, token})
        } catch (error){
            res.status(400).json({error: error.message})
        }
    },
    
    // signup user
    signupUser: async (req, res) => {
        const {email, firstName, lastName, password} = req.body

        try{
            const user = await User.signup(email, firstName, lastName, password)

            // create a token
            const token = createToken(user._id)

            res.status(200).json({email, firstName, token})
        } catch (error){
            res.status(400).json({error: error.message})
        }
    }
    
}