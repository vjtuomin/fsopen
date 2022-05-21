const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (_request, response,next) => {
    let persons = []
    Person.find({}).then(result => {
        result.forEach(person => {
            persons = persons.concat(person)
        })
        response.json(persons)
    })
        .catch(error => next(error))
})
personsRouter.get('/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json(person)
        })
        .catch(error => next(error))
})
personsRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

personsRouter.put('/:id', (req, res, next) => {
    console.log(req.body)
    const body = req.body
     
    Person.findByIdAndUpdate(req.params.id, {number: `${body.number}`},  { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

personsRouter.post('/', (request,res,next) => {
        
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
      

personsRouter.get('/info', (_req, res) => {
    const date = new Date()
    Person.count().then(count => 
        res.send(`<p>Phonebook has info for ${count} people</p>${date}<p>`)
    )
})

module.exports=personsRouter