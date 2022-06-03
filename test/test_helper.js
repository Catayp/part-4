const Blog = require('../models/modelBlogs')
const User = require('../models/modelUsers')

const initialBlogs = [
  {
    title: 'pato',
    author: 'blaaaaa',
    url: 'sdffsdff',
    likes: 546
  },
  {
    title: 'gato',
    author: 'blaaaaaa',
    url: 'hgffff',
    likes: 546
  }
]

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
module.exports = {
  initialBlogs, blogsInDb, usersInDb
}