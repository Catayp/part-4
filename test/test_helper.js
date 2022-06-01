const Blog = require('../models/modelBlogs.js')
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
// const nonExistingId = async () => {
//   const blog = new Blog()
//   blog.save()
//   blog.remove()
// }
const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(blog => blog.toJSON())
}
module.exports = {
  initialBlogs, blogsInDb
}