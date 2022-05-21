const mongoose = require('mongoose')


const numberValidator = function (number)  {

    return (number[2]=== '-' || number[3]=== '-')
  
}


const personSchema = new mongoose.Schema({
    name: {
        type:String,
        minlength: 3,
    },
    number: {
        type: String,
        minlength: 8,
        validate: [numberValidator, 'Incorrect number format']
    } 
})




personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)