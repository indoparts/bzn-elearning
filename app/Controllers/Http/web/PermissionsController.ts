import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Permission from 'App/Models/Permission'
import { datatables } from 'App/helper'

export default class PermissionsController {
    public async index({ bouncer, view, request }: HttpContextContract) {
        await bouncer.authorize("read-permission")
        if (request.ajax()) {
            return datatables(request.all(),
                'permissions',
                ['name', 'created_at', 'updated_at'],
                {
                    typeact: 'btn',
                    attr: [
                        { btntext: 'Hapus', icon: '<i class="fa-sharp fa-solid fa-trash"></i>', url: 'akses', permission: 'delete-permission' }
                    ]
                }
            )
        }
        return view.render('webAdmin/pages/Permission/index', { permission: ['create', 'read', 'update', 'delete'], })
    }

    public async create({ bouncer, view }: HttpContextContract) {
        await bouncer.authorize("create-permission")
        return view.render('webAdmin/pages/Permission/form', { act: 'create' })
    }

    public async store({ bouncer, request, response, session }: HttpContextContract) {
        /*
        |--------------------------------------------------------------------------
        | EXAMPLE REQUEST FORM
        |--------------------------------------------------------------------------
        {
            "name": "Cuti",
            "permission": ["create","read","update","delete","export","import"]
        }
        |
        */
        await bouncer.authorize("create-permission")
        if (await bouncer.allows('create-permission')) {
            const payload = await request.validate({
                schema: schema.create({
                    name: schema.string(),
                    permission: schema
                        .array([
                            rules.minLength(1),
                            rules.maxLength(5)
                        ])
                        .members(schema.string()),
                })
            })
            const arrname = [] as any;
            const fetch = payload['permission']
            for (let i = 0; i < fetch.length; i++) {
                const txt = fetch[i] + '-' + payload['name']
                arrname.push({
                    name: txt.toLowerCase(),
                })
            }
            await Permission.createMany(arrname)
            session.flash({ notification: 'Data Berhasil Disimpan!' })
            return response.redirect().toRoute('web/PermissionsController.index')
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("delete-permission")
            if (await bouncer.allows('delete-permission')) {
                const q = await Permission.find(request.param('id'))
                if (q) {
                    await q.delete()
                }
                return response.send({ status: true, data: {}, msg: 'success' })
            }
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'errors' })
        }
    }
}
