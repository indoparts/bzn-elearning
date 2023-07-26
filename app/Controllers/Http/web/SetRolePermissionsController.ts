import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'
import RoleHasPermission from 'App/Models/RoleHasPermission'

export default class SetRolePermissionsController {
    public async index({ request, bouncer, view }: HttpContextContract) {
        await bouncer.authorize("read-permission")
        const page = request.input('page', 1);
        const q = await Permission.query().orderBy([
            {
                column: 'id',
                order: 'desc',
            }
        ]).paginate(page, 20)
        const role = await Role.all()
        return view.render('webAdmin/pages/RoleHasPermission/index', {
            permission: q.toJSON(),
            roles: role,
        })
    }

    public async store({ bouncer, request, response, session }: HttpContextContract) {
        await bouncer.authorize("create-permission")
        const newPostSchema = schema.create({
            role_id: schema.number(),
            permission_id: schema.array().members(schema.number()),
        })
        if (await bouncer.allows('create-permission')) {
            try {
                const payload = await request.validate({ schema: newPostSchema })
                const arrname = [] as any;
                const fetch = payload.permission_id
                for (let i = 0; i < fetch.length; i++) {
                    arrname.push(fetch[i])
                }
                await (await Role.findOrFail(payload.role_id)).related('permission').sync(arrname)
                session.flash({ notification: 'Data Berhasil Disimpan!', status: 'success' })
                return response.redirect().toRoute('web/SetRolePermissionsController.index')
            } catch (error) {
                session.flash({ notification: error.messages, status: 'errors' })
                return response.redirect().toRoute('web/SetRolePermissionsController.index')
            }
        }
    }

    public async show({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.authorize("read-permission")
            if (await bouncer.allows('read-permission')) {
                const id = request.param('id')
                console.log(id);

                const fetch = await RoleHasPermission.query()
                    .where('role_id', id)
                return response.send({ status: true, data: fetch, msg: 'success' })
            }
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'errors' })
        }
    }
}
