const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const User = require('../models/modelUsers')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ userName: 'root', passwordHash })

    await user.save()
  })
  test('blogs are returned as json', async () => {
    const response =
    await api
      .get('/api/users')
      .expect('Content-Type', /application\/json/)
    expect(response.body)
  })
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      userName: 'mluukkai',
      name: 'dfd Luukkainen',
      password: 'blabal',
      blogId: '629a1854c3998c04750ac6cb'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.userName)
    expect(usernames).toContain(newUser.userName)
  })
})