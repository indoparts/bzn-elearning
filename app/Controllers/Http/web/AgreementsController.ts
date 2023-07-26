import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Agreement from 'App/Models/Agreement';

export default class AgreementsController {
    public async index({ request, view, response }: HttpContextContract) {
        if (request.ajax()) {
            const input = request.all()
            const limit = input['length'];
            const fetch = await Agreement.query()
              .orderBy('id', 'desc')
              .preload('clients')
              .paginate((input['start'] / limit) + 1, limit)
            return response.send({ status: true, data: fetch, msg: 'success' })
          }
        return view.render('webAdmin/pages/Agreement/index')
    }
    public async destroy({ request, response }: HttpContextContract) {
        try {
            const user = await Agreement.findOrFail(request.param('id'))
            await user.delete()
            return response.send({ status: true, data: {}, msg: 'success' })
        } catch (error) {
            return response.send({ status: false, data: error.messages, msg: 'errors' })
        }
    }
}
