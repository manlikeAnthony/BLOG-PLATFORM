require('express-async-errors')
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


const connectDB = require('./database/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const authMiddleware = require('./middleware/auth')
const authRouter = require('./routes/user')
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comments')

app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/post', authMiddleware, postRouter)
app.use('/api/v1/comments', authMiddleware, commentRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server is listening on port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

start()