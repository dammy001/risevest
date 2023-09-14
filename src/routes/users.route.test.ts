import request from 'supertest'
import usersRoutes from './users.route'
import { App } from '@/app'

describe('UserRoute', () => {
  it('should be defined', () => {
    expect(usersRoutes).toBeDefined()
  })

  it.skip('should create a new user', async () => {
    const newUser = {
      email: 'testuser@example.com',
      firstName: 'Damilare',
      lastName: 'Anjorin',
      userName: 'damilare000',
    }

    const response = await request(new App().getApplication()).post('/api/users').send(newUser)

    expect(response.status).to.equal(201)

    expect(response.body.status).to.be.true
  })
})
