const _ = require("lodash"); 

const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
      }


    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0);
    
}

const favoriteBlog = (blogs) => {
    
    const max = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    }) 
    return max
}

const mostBlogs = (blogs) => {
    
    const count = _.countBy(blogs, 'author')
    const arr = Object.entries(count).map((e) => ( { [e[0]]: e[1] } ));
    const max = arr.reduce((prev, current) => {
        return (prev.value > current.value) ? prev : current
    }) 
    
    return max
    

}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }