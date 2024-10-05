const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('invalid credentials')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token , process.env.JWT_SECRET)
        req.user = {userId : payload.userId , name : payload.name};
        next()
    } catch (err) {
        throw new UnauthenticatedError('invalid credentials skill issue')
    }
}


module.exports = auth