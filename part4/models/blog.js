const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likes: {type : Number , default : 0}
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
       
    }
})
  
 module.exports = mongoose.model('Blog', blogSchema)