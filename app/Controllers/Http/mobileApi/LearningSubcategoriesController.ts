import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientLearningSubcategory from 'App/Models/ClientLearningSubcategory'
import LearningSubcategory from 'App/Models/LearningSubcategory'

export default class LearningSubcategoriesController {
  public async index({ response, request, auth }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 1)
      const sortDesc = request.input('sortDesc', false)
      const search = request.input('search')
      const classificationClient = await ClientLearningSubcategory
        .query()
        .where('client_id', auth.user!.id)
      const wherein: number[] = []
      classificationClient.forEach(e => {
        wherein.push(e.learning_subcategory_id)
      });
      const fetch = await LearningSubcategory.query()
        .where((query) => {
          query
            .whereIn('id', wherein)
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
      const q = await LearningSubcategory.query()
        .where('id', request.param('id'))
        .preload('subcategory')
        .first()
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.abort(error)
    }
  }
}
