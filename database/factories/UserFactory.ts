import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Client from 'App/Models/Client'
import Agreement from 'App/Models/Agreement'

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      role_id: 1,
      name: faker.internet.userName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: '123456',
    }
  }).build()
export const ClientFactory = Factory
  .define(Client, ({ faker }) => {
    const status = ['active', 'inactive', 'block']
    return {
      frontname: faker.internet.userName(),
      midname: faker.internet.userName(),
      backname: faker.internet.userName(),
      fullname: faker.internet.userName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: '123456',
      status: status[Math.floor(Math.random() * status.length)],
    }
  }).build()
export const AgreementFactory = Factory.define(Agreement, () => {
  return {
    status: 'agree'
  }
})
  .relation('clients', () => ClientFactory)
  .build()
