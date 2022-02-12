
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
const Person = require('./models/person')

morgan.token('body', function getId (req) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :response-time :body'))




app.get('/api/persons', (request, response,next) => {
    let persons = []
    Person.find({}).then(result => {
        result.forEach(person => {
            persons = persons.concat(person)
        })
        response.json(persons)
    })
        .catch(error => next(error))
})
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json(person)
        })
        .catch(error => next(error))
})
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    console.log(req.body)
    const body = req.body
     
    Person.findByIdAndUpdate(req.params.id, {number: `${body.number}`},  { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request,res,next) => {
        
    console.log(request.body)
    const body = request.body
        

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson=> {
        res.json(savedPerson)
    })
        .catch(error => next(error))

})
      

app.get('/info', (req, res) => {
    const date = new Date()
    Person.count().then(count => 
        res.send(`<p>Phonebook has info for ${count} people</p>${date}<p>`)
    )
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
      
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
      
    next(error)
}

app.use(errorHandler)
      
      
// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

