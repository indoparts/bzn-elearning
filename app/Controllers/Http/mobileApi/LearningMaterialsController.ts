import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientLearningCategory from 'App/Models/ClientLearningCategory'
import LearningMaterial from 'App/Models/LearningMaterial'

export default class LearningMaterialsController {
  public async index({ response, request, auth }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 1)
      const sortDesc = request.input('sortDesc', false)
      const search = request.input('search')
      const wherein: number[] = []
      const classificationClient = await ClientLearningCategory
        .query()
        .where('client_id', auth.user!.id)
        .preload('subcategory')
      classificationClient.forEach(e => {
        if (e.subcategory !== null) {
          wherein.push(e.subcategory.id)
        }
      });
      if (wherein.length > 0) {
        const fetch = await LearningMaterial.query()
          .where((query) => {
            query
              .whereIn('learning_subcategory_id', wherein)
              .where('title', 'LIKE', '%' + search + '%')
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
      }
      return response.send({ status: true, data: [], msg: 'success' })
    } catch (error) {
      console.log(error);
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const q = await LearningMaterial.query()
        .where('id', request.param('id'))
        .preload('subcategory')
        .first()
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.abort(error)
    }
  }
}
