const { StatusCodes } = require('http-status-codes')

const errorHandler = async (err, req, res, next) => {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'something went wrong'
    }
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(',');
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    if (err.name === 'CastError') {
        customError.msg = `no item found with id: ${err.value}`
        customError.statusCode = StatusCodes.NOT_FOUND
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field , please chooose another`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    return res.status(customError.statusCode).json({ msg: customError.msg })
}
module.exports = errorHandler