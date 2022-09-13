const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/modelBlogs')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  const response =
  await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('return titles blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  expect(contents)
})

test('post blogs', async () => {
  const newBlog = {
    title: 'lulu',
    author: 'dfgdf',
    url: 'String',
    likes: 5555,
    userId:'629a2635427d6e41ffd75533'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
  const titles = blogsAtEnd.map(u => u.title)
  expect(titles).toContain(newBlog.title)
})

test('a specific blog can be viewed', async () => {
  const blogStart = await  helper.blogsInDb()
  const blogToView = blogStart[1]
  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const processedBlog = JSON.parse(JSON.stringify(blogToView))
  expect(resultBlog.body).toEqual(processedBlog)
})

test('a blog can be deleted', async () => {
  const blogStart = await  helper.blogsInDb()
  const blogDelete = blogStart[0]
  await api
    .delete(`/api/blogs/${blogDelete.id}` )
    .expect(204)
  const blogEnd = await  helper.blogsInDb()
  expect(blogEnd).toHaveLength(
    helper.initialBlogs.length -1
  )
  const contents = blogEnd.map(r => r.id)
  expect(contents).not.toContain(blogDelete.id)
})

afterAll(() => {
  mongoose.connection.close()
})