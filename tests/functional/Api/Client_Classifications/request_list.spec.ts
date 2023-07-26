import { test } from '@japa/runner'
import Client from 'App/Models/Client'

test.group('Api client classification request list', () => {
  const baseUrl = "/client/client-classification"
  test('set goals test', async ({ client }) => {
    const user = await Client.find(1)
    const response = await client.post(`${baseUrl}/set-client-goals`)
      .form({
        goals: "perbaharuan kemampuan"
      })
      .loginAs(user!)
    const data = response.body()
    response.assertStatus(200)
    response.assertBody({
      status: data.status,
      data: data.data,
      msg: data.msg
    })
  })
  test('set stages career test', async ({ client }) => {
    const user = await Client.find(1)
    const response = await client.post(`${baseUrl}/set-client-career-stages`)
      .form({
        stages: "mencari promosi"
      })
      .loginAs(user!)
    const data = response.body()
    response.assertStatus(200)
    response.assertBody({
      status: data.status,
      data: data.data,
      msg: data.msg
    })
  })
  test('set category career test', async ({ client }) => {
    const user = await Client.find(1)
    const response = await client.post(`${baseUrl}/set-client-career-category`)
      .form({
        career_category_id: [1, 2, 3]
      })
      .loginAs(user!)
    const data = response.body()
    response.assertStatus(200)
    response.assertBody({
      status: data.status,
      data: data.data,
      msg: data.msg
    })
  })
  test('set category learning test', async ({ client }) => {
    const user = await Client.find(1)
    const response = await client.post(`${baseUrl}/set-client-learning-category`)
      .form({
        learning_category_id: [1, 2, 3]
      })
      .loginAs(user!)
    const data = response.body()
    response.assertStatus(200)
    response.assertBody({
      status: data.status,
      data: {
        learning_category_id: data.data.learning_category_id
      },
      msg: data.msg
    })
  })
  test('set subcategory learning test', async ({ client }) => {
    const user = await Client.find(1)
    const response = await client.post(`${baseUrl}/set-client-learning-subcategory`)
      .form({
        learning_subcategory_id: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      })
      .loginAs(user!)
    const data = response.body()
    response.assertStatus(200)
    response.assertBody({
      status: data.status,
      data: {
        learning_subcategory_id: data.data.learning_subcategory_id
      },
      msg: data.msg
    })
  })
})
