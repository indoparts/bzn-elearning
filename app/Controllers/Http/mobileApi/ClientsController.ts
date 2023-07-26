import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import { ClientCreateValidator, ClientUpdateValidator } from 'App/Validators/ClientValidator'
import { datatables } from 'App/helper'

export default class ClientsController {
  public async index({ request, view }: HttpContextContract) {
    if (request.ajax()) {
      return datatables(request.all(),
        'clients',
        ['id', 'frontname', 'midname', 'backname', 'fullname', 'username', 'email', 'status', 'created_at', 'updated_at'],
        {
          typeact: 'btn',
          attr: [
            { btntext: 'Lihat', icon: '<i class="fa-solid fa-file"></i>', url: 'client', permission: 'read-client' },
            { btntext: 'Ubah', icon: '<i class="fa-solid fa-file-pen"></i>', url: 'client', permission: 'update-client' },
            { btntext: 'Hapus', icon: '<i class="fa-sharp fa-solid fa-trash"></i>', url: 'client', permission: 'delete-client' }
          ]
        }
      )
    }
    return view.render('webAdmin/pages/Client/index')
  }

  public async create({ view }: HttpContextContract) {
    return view.render('webAdmin/pages/Client/form', { act: 'create' })
  }

  public async store({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(ClientCreateValidator)
    const q = new Client
    q.merge(payload)
    await q.save()
    session.flash({ notification: 'Data Berhasil Disimpan!' })
    return response.redirect().toRoute('web/ClientsController.index')
  }

  public async show({ request, view }: HttpContextContract) {
    const q = await Client.find(request.param('id'))
    return view.render('webAdmin/pages/Client/form', { client: q, act: 'show' })
  }

  public async edit({ request, view }: HttpContextContract) {
    const q = await Client.find(request.param('id'))
    return view.render('webAdmin/pages/Client/form', { client: q, act: 'update' })
  }

  public async update({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(ClientUpdateValidator)
    const q = await Client.findOrFail(request.param('id'))
    q.merge(payload)
    await q.save()
    session.flash({ notification: 'Data Berhasil Disimpan!' })
    return response.redirect().toRoute('web/ClientsController.index')
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const user = await Client.findOrFail(request.param('id'))
      await user.delete()
      return response.send({ status: true, data: {}, msg: 'success' })
    } catch (error) {
      return response.send({ status: false, data: error.messages, msg: 'errors' })
    }
  }
}
