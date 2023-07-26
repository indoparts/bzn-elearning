import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CareerCategory from 'App/Models/CareerCategory'
import ClientCareerCategory from 'App/Models/ClientCareerCategory'

export default class CareerCategoriesController {
  public async index({ response, request, auth }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 1)
      const sortDesc = request.input('sortDesc', false)
      const search = request.input('search')
      const classificationClient = await ClientCareerCategory.findByOrFail('client_id', auth.user!.id)
      const fetch = await CareerCategory.query()
        .where((query) => {
          query
            .where('id', classificationClient!.career_category_id)
            .where('name', 'LIKE', '%' + search + '%')
        })
        .orderBy([
          {
            column: 'created_at',
            order: sortDesc ? 'desc' : 'asc',
          }
        ])
        .preload('subcategory')
        .paginate(page, limit)
      return response.send({ status: true, data: fetch, msg: 'success' })
    } catch (error) {
      console.log(error);
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const q = await CareerCategory.query().where('id', request.param('id')).preload('subcategory').first()
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.abort(error)
    }
  }
}

