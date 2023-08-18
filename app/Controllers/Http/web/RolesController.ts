import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Role from 'App/Models/Role'
import { datatables } from 'App/helper'

export default class RolesController {
    public async index({ bouncer, request, view }: HttpContextContract) {
        await bouncer.authorize("read-user")
        if (request.ajax()) {
            return datatables(request.all(),
                'roles',
                ['name', 'created_at', 'updated_at'],
                {
                    typeact: 'btn',
                    attr: [
                        { btntext: 'Lihat', icon: '<i class="fa-solid fa-file"></i>', url: 'role', permission: 'read-role' },
                        { btntext: 'Ubah', icon: '<i class="fa-solid fa-file-pen"></i>', url: 'role', permission: 'update-role' },
                        { btntext: 'Hapus', icon: '<i class="fa-sharp fa-solid fa-trash"></i>', url: 'role', permission: 'delete-role' }
                    ]
                }
            )
        }
        return view.render('webAdmin/pages/Role/index', { roles: null, })
    }

    public async create({ bouncer, view }: HttpContextContract) {
        await bouncer.authorize("create-role")
        return view.render('webAdmin/pages/Role/form', { act: 'create' })
    }

    public async store({ bouncer, request, session, response }: HttpContextContract) {
        await bouncer.authorize("create-role")
        if (await bouncer.allows('create-role')) {
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string(),
                })
            })
            const role = new Role()
            role.merge(payload)
            await role.save()
            session.flash({ notification: 'Data Berhasil Disimpan!' })
            return response.redirect().toRoute('web/RolesController.index')
        }
    }

    public async show({ bouncer, request, view }: HttpContextContract) {
        await bouncer.authorize("read-role")
        if (await bouncer.allows('read-role')) {
            const q = await Role.find(request.param('id'));
            return view.render('webAdmin/pages/Role/form', { act: 'show', role:q })
        }
    }

    public async edit({ bouncer, request, view }: HttpContextContract) {
        await bouncer.authorize("update-user")
        if (await bouncer.allows('update-user')) {
            const q = await Role.find(request.param('id'))
            return view.render('webAdmin/pages/Role/form', { act: 'update', role:q })
        }
    }

    public async update({ bouncer, request, response, session }: HttpContextContract) {
        await bouncer.authorize("update-role")
        if (await bouncer.allows('update-role')) {
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string(),
                })
            })
            const role = await Role.findOrFail(request.param('id'))
            role.merge(payload)
            await role.save()
            session.flash({ notification: 'Data Berhasil Disimpan!', type:'success' })
            return response.redirect().toRoute('web/RolesController.index')
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("delete-role")
            if (await bouncer.allows('delete-role')) {
                const role = await Role.findOrFail(request.param('id'))
                await role.delete()
                return response.send({ status: true, data: {}, msg: 'success' })
            }
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'errors' })
        }
    }
}

