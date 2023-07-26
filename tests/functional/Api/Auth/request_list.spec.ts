import { test } from '@japa/runner'
import Client from 'App/Models/Client'

test.group('Api auth request list', () => {
  const baseUrl="/client/auth"
  test('login test', async ({ client }) => {
    const response = await client.post(`${baseUrl}/login`)
      .form({
        email: 'client@test.tes',
        password: '123456'
      })
    const data = response.body()
    response.assertStatus(200)
    response.assertBody({
      status: data.status,
      data: {
        type: data.data.type,
        token: data.data.token,
        expires_at: data.data.expires_at,
      },
      msg: data.msg
    })
  })
  test('profile show data test', async ({ client }) => {
    const user = await Client.find(1)
    const response = await client.get(`${baseUrl}/profile`)
      .loginAs(user!)
    const data = response.body()
    response.assertStatus(200)
    response.assertBody({
      status: data.status,
      data: {
        id: data.data.id,
        frontname: data.data.frontname,
        midname: data.data.midname,
        backname: data.data.backname,
        fullname: data.data.fullname,
        username: data.data.username,
        email: data.data.email,
        password: data.data.password,
        status: data.data.status,
        created_at: data.data.created_at,
        updated_at: data.data.updated_at,
      },
      msg: data.msg
    })
  })
  test('profile update (form::success) data test', async ({ client }) => {
    const user = await Client.find(1)
    const response = await client.post(`${baseUrl}/profile`)
      .form({
        frontname: 'depan',
        midname: 'tengah',
        backname: 'belakang',
        fullname: 'depan tengah belakang',
        username: 'client',
        email: 'client@test.tes',
        password: '123456',
        password_confirmation: '123456'
      })
      .loginAs(user!)
    const data = response.body()
    response.assertStatus(200)
    response.assertBody({
      status: data.status,
      data: {
        frontname: data.data.frontname,
        midname: data.data.midname,
        backname: data.data.backname,
        fullname: data.data.fullname,
        username: data.data.username,
        email: data.data.email,
        password: data.data.password,
      },
      msg: data.msg
    })
  })
  test('profile update (form::fail) data test', async ({ client }) => {
    const user = await Client.find(1)
    const response = await client.post(`${baseUrl}/profile`)
      .loginAs(user!)
    const data = response.body()
    response.assertStatus(422)
    response.assertBody({
      status: data.status,
      data: {
        username: data.data.username,
        email: data.data.email,
      },
      msg: data.msg
    })
  })
  test('logout test', async ({ client }) => {
    const user = await Client.find(1)
    const response = await client.post(`${baseUrl}/logout`)
      .loginAs(user!)
    const data = response.body()
    response.assertStatus(200)
    response.assertBody({
      status: data.status,
      data: data.data,
      msg: data.msg
    })
  })

})
