import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientLearningCategory from 'App/Models/ClientLearningCategory'
import LearningCategory from 'App/Models/LearningCategory'

export default class LearningCategoriesController {
  public async index({ response, request, auth }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 1)
      const sortDesc = request.input('sortDesc', false)
      const search = request.input('search')
      const classificationClient = await ClientLearningCategory.findByOrFail('client_id', auth.user!.id)
      const fetch = await LearningCategory.query()
        .where((query) => {
          query
            .where('id', classificationClient!.learning_category_id)
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
      const q = await LearningCategory.query()
        .where('id', request.param('id'))
        .preload('subcategory')
        .first()
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.abort(error)
    }
  }
}

