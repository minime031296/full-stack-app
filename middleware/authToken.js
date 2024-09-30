const jwt = require('jsonwebtoken')
require('dotenv').config()


const authToken = async(req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1] || req.headers.Authorization?.split(' ')[1]

    if(!token) {
        return res.status(401).json("Unauthorized")
    }

    jwt.verify(token , process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).json("Err in authtoken")
        }
        req.userId = decoded.id
    })
    next()
}

module.exports = authToken