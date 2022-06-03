const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/modelUsers')
const Blog = require('../models/modelBlogs')

usersRouter.get('/', async (request, response) => {
  const user = await User
    .find({}).populate('blogs')
  response.json(user)
})
usersRouter.post('/', async (request, response) => {
  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const blog = await Blog.findById(body.blogId)

  const user = new User({
    userName: body.userName,
    name: body.name,
    passwordHash,
    blogs: blog._id
  })
  const savedUser = await user.save()
  blog.user = blog.user.concat(savedUser._id)
  await blog.save()
  response.json(savedUser)
})

module.exports = usersRouter