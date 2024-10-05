const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequest, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    const { email } = req.body;  
    const check = await User.findOne({ email });
    if (check) {
        throw new BadRequest('Email already exists');
    }
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest('must provide email and password')
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('invalid credentials')
    }
    const token = await user.createJWT() 
    res.status(StatusCodes.OK).json({user : {name : user.name} , token})
}

module.exports = {
    register,
    login
}