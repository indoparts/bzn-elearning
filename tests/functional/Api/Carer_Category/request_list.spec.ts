import { test } from '@japa/runner'
import Client from 'App/Models/Client'

test.group('Api career category request list', () => {
  const baseUrl = "/client/career-category"
  test('category index data test', async ({ client }) => {
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
      data: {
        meta: {
          total: data.data.meta.total,
          per_page: data.data.meta.per_page,
          current_page: data.data.meta.current_page,
          last_page: data.data.meta.last_page,
          first_page: data.data.meta.first_page,
          first_page_url: data.data.meta.first_page_url,
          last_page_url: data.data.meta.last_page_url,
          next_page_url: data.data.meta.next_page_url,
          previous_page_url: data.data.meta.previous_page_url,
        },
        data: data.data.data
      },
      msg: data.msg
    })
  })
  test('category show data test', async ({ client }) => {
    const user = await Client.find(1)
    const id = 101
    const response = await client.get(`${baseUrl}/show/${id}`)
      .loginAs(user!)
    const data = response.body()
    response.assertStatus(200)
    response.assertBody({
      status: data.status,
      data: {
        id: data.data.id,
        created_by: data.data.created_by,
        icon: data.data.icon,
        name: data.data.name,
        created_at: data.data.created_at,
        updated_at: data.data.updated_at,
        subcategory: data.data.subcategory,
      },
      msg: data.msg
    })
  })
})
