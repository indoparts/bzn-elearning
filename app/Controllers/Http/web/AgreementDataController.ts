import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import AgreementDatum from 'App/Models/AgreementDatum'

import { datatables } from 'App/helper'

export default class AgreementDataController {
    public async index({ bouncer, request, view }: HttpContextContract) {
        await bouncer.authorize("read-user")
        if (request.ajax()) {
            return datatables(request.all(),
                'agreement_data',
                ['title', 'content', 'status'],
                {
                    typeact: 'btn',
                    attr: [
                        { btntext: 'Lihat', icon: '<i class="fa-solid fa-file"></i>', url: 'masterdata-term-condition', permission: 'read-user' },
                        { btntext: 'Ubah', icon: '<i class="fa-solid fa-file-pen"></i>', url: 'masterdata-term-condition', permission: 'update-user' },
                        { btntext: 'Hapus', icon: '<i class="fa-sharp fa-solid fa-trash"></i>', url: 'masterdata-term-condition', permission: 'delete-user' }
                    ]
                }
            )
        }
        return view.render('webAdmin/pages/AgreementData/index')
    }

    public async create({ bouncer, view }: HttpContextContract) {
        await bouncer.authorize("create-user")
        return view.render('webAdmin/pages/AgreementData/form', { act: 'create' })
    }

    public async store({ request, session, response, auth }: HttpContextContract) {
        const payload = await request.validate({
            schema: schema.create({
                title: schema.string(),
                status: schema.enum(['on', 'off']),
                content: schema.string()
            })
        })
        payload['status'] = payload['status'] === 'on' ? 'active' : 'inactive'
        payload['created_by'] = auth.user!.id
        const q = new AgreementDatum()
        q.merge(payload)
        await q.save()
        session.flash({ notification: 'Data Berhasil Disimpan!' })
        return response.redirect().toRoute('web/AgreementDataController.index')
    }

    public async show({ request, view }: HttpContextContract) {
        const q = await AgreementDatum.find(request.param('id'))
        return view.render('webAdmin/pages/AgreementData/form', { data: q, act: 'show' })
    }

    public async edit({ request, view }: HttpContextContract) {
        const q = await AgreementDatum.find(request.param('id'))
        return view.render('webAdmin/pages/AgreementData/form', { data: q, act: 'update' })
    }

    public async update({ request, session, response, auth }: HttpContextContract) {
        const payload = await request.validate({
            schema: schema.create({
                title: schema.string(),
                status: schema.enum(['on', 'off']),
                content: schema.string()
            })
        })
        payload['status'] = payload['status'] === 'on' ? 'active' : 'inactive'
        payload['created_by'] = auth.user!.id
        const q = await AgreementDatum.findOrFail(request.param('id'))
        q.merge(payload)
        await q.save()
        session.flash({ notification: 'Data Berhasil Disimpan!' })
        return response.redirect().toRoute('web/AgreementDataController.index')
    }

    public async destroy({ request, response }: HttpContextContract) {
        try {
            const user = await AgreementDatum.findOrFail(request.param('id'))
            await user.delete()
            return response.send({ status: true, data: {}, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'errors' })
        }
    }
}
