// i poked around at this so much i think i broke it. 


// auth controller file has been on my nerves all weekend, it refuses to connect to the API/postman, i had help but on line 5 the nodemon wont connect unless its written as shown. originally had ('../models).User
// postman states that User.findOne is not a function even tho on line 18 i have it written as one. 

// the authcontroller practically destroyed my API on postman and now doesnt even listen, along with my Database for PGadmim4/postgreSQL not responding stating that NOW is not a function
// most of my issues seem to be stemming from this file.
// also my updatedAt is not appearing in the database........i am going to lose it




const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/app')

exports.login = async (req, res) => {
    const { email, password } = req.body

    try {

        // const secret = require('crypto').randomBytes(64).toString('hex')

        // find the user
        const user = await User.findOne({
            where: {
                email
            }
        })

        // check if user found
        if (!user) return res.status(404).json({ message: 'User not found!' })

        // check if password matches
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Incorrect password!' })

        // generate auth token
        const userWithToken = generateToken(user.get({ raw: true }))
        userWithToken.user.avatar = user.avatar

        return res.send(userWithToken)

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

exports.register = async (req, res) => {

    try {
        const user = await User.create(req.body)

        const userWithToken = generateToken(user.get({ raw: true }))
        return res.send(userWithToken)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

const generateToken = (user) => {

    delete user.password

    const token = jwt.sign(user, config.appKey, { expiresIn: 86400 })

    return { ...{ user }, ...{ token } }
}