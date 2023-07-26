import { test } from '@japa/runner'
import Client from 'App/Models/Client'

test.group('Api learning material request list', () => {
  const baseUrl = "/client/learning-material"
  test('material index data test', async ({ client }) => {
    const user = await Client.find(1)
    const page = 1
    const limit = 10
    const sortDesc = 'desc'
    const search = ''
    const response = await client.get(`${baseUrl}/index?page=${page}&limit=${limit}&sortDesc=${sortDesc}&search=${search}`)
      .loginAs(user!)
    const data = response.body()
    response.assertStatus(200)
    response.assertBody({
      status: data.status,
      data: data.data,
      msg: data.msg
    })
  })
  test('material show data test', async ({ client }) => {
    const user = await Client.find(1)
    const id = 101
    const response = await client.get(`${baseUrl}/show/${id}`)
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
