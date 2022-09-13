const router = require('express').Router()
// const Blog = require('../models/modelBlogs')
const User = require('../models/modelUsers')

router.post('/reset', async (request, response) => {
  // await Blog.deleteMany({})
  // let blogObject = {
  //   title: 'pato',
  //   author: 'blaaaaa',
  //   url: 'sdffsdff',
  //   likes: 546
  // }
  // let newBlog = new Blog(blogObject)
  // await newBlog.save()
  await User.deleteMany({})
  response.status(204).end()
})

module.exports = router