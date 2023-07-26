import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import { UserCreateValidator, UserUpdateValidator } from 'App/Validators/UserValidator'
import { datatables } from 'App/helper'
export default class UsersController {

    public async index({ bouncer, request, view }: HttpContextContract) {
        await bouncer.authorize("read-user")
        if (request.ajax()) {
            return datatables(request.all(),
                'users',
                ['username', 'email', 'name'],
                {
                    typeact: 'btn',
                    attr: [
                        { btntext: 'Lihat', icon: '<i class="fa-solid fa-file"></i>', url: 'pengguna', permission: 'read-user' },
                        { btntext: 'Ubah', icon: '<i class="fa-solid fa-file-pen"></i>', url: 'pengguna', permission: 'update-user' },
                        { btntext: 'Hapus', icon: '<i class="fa-sharp fa-solid fa-trash"></i>', url: 'pengguna', permission: 'delete-user' }
                    ]
                }
            )
        }
        return view.render('webAdmin/pages/Pengguna/index')
    }

    public async create({ bouncer, view }: HttpContextContract) {
        await bouncer.authorize("create-user")
        const role = await Role.all()
        return view.render('webAdmin/pages/Pengguna/form', { roles: role, act: 'create' })
    }

    public async store({ bouncer, request, response, session }: HttpContextContract) {
        await bouncer.authorize("create-user")
        if (await bouncer.allows('create-user')) {
            const payload = await request.validate(UserCreateValidator)
            const q = new User
            q.merge(payload)
            await q.save()
            session.flash({ notification: 'Data Berhasil Disimpan!' })
            return response.redirect().toRoute('web/UsersController.index')
        }
    }

    public async show({ bouncer, request, view }: HttpContextContract) {
        await bouncer.authorize("read-user")
        if (await bouncer.allows('read-user')) {
            const user = await User.find(request.param('id'))
            const role = await Role.all()
            return view.render('webAdmin/pages/Pengguna/form', { roles: role, users: user, act: 'show' })
        }
    }

    public async edit({ bouncer, request, view }: HttpContextContract) {
        await bouncer.authorize("update-user")
        if (await bouncer.allows('update-user')) {
            const user = await User.find(request.param('id'))
            const role = await Role.all()
            return view.render('webAdmin/pages/Pengguna/form', { roles: role, users: user, act: 'update' })
        }
    }

    public async update({ bouncer, request, session, response }: HttpContextContract) {
        if (await bouncer.allows('update-user')) {
            const payload = await request.validate(UserUpdateValidator)
            const q = await User.findOrFail(request.param('id'))
            q.merge(payload)
            await q.save()
            session.flash({ notification: 'Data Berhasil Disimpan!' })
            return response.redirect().toRoute('web/UsersController.index')
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("delete-user")
            if (await bouncer.allows('delete-user')) {
                const user = await User.findOrFail(request.param('id'))
                await user.delete()
                return response.send({ status: true, data: {}, msg: 'success' })
            }
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'errors' })
        }
    }
}

