
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const personsRouter = require('./controllers/persons')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())


morgan.token('body', function getId (req) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :response-time :body'))


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use('/api/persons', personsRouter)


app.use(middleware.unknownEndpoint)

app.use(middleware.requestLogger)

app.use(middleware.errorHandler)
      
module.exports = app

