const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')


const api = supertest(app)



test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    const obj = response.body[0]
    expect(obj._id).toBeDefined()
})

test(' 2 blogs are returned as json', async () => {
 const response =  await api.get('/api/blogs')
     
     expect(response.body).toHaveLength(2)
})

test('blogs are added', async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user: "62851bd0d7ef2dddb2b466a8",
    __v: 0
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(3)

  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).toContain(
    'TDD harms architecture'
  )

})

test('blogs have 0 likes if not defined', async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    user: "62851bd0d7ef2dddb2b466a8",
    __v: 0
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(3)

  const contents = blogsAtEnd.map(blog => blog.likes)
  expect(contents[2]).toBe(0)

})

test('bad rquest if no url', async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    user: "62851bd0d7ef2dddb2b466a8",
    __v: 0
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)

})

test('bad request if no title', async () => {
  const newBlog = {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    user: "62851bd0d7ef2dddb2b466a8",
    __v: 0
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
})

test('succeeds with status code 204 if id is valid', async () => {
  const blogs = await helper.blogsInDb()
  const blogToDelete = blogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    
  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const ids = blogsAtEnd.map(r => r.id)
   console.log(ids)
  expect(ids).not.toContain(blogToDelete.id)
})


describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'valt',
      name: 'Valtteri Tuominen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation does not succeed if password < 3 chars', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'valt',
      name: 'Valtteri Tuominen',
      password: 'sa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length )

    
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

afterAll(() => {
  mongoose.connection.close()
})