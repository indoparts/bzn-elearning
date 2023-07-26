import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CareerCategory from 'App/Models/CareerCategory'
import CareerMaterial from 'App/Models/CareerMaterial'
import ClientCareerCategory from 'App/Models/ClientCareerCategory'

export default class CareerMaterialsController {
  public async index({ response, request, auth }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 1)
    const sortDesc = request.input('sortDesc', false)
    const search = request.input('search')
    const classificationClient = await ClientCareerCategory.findByOrFail('client_id', auth.user!.id)
    const subcategory = await CareerCategory.query()
      .where('id', classificationClient.career_category_id)
      .preload('subcategory').first()
    const wherein: number[] = []
    subcategory!.subcategory.forEach(e => {
      wherein.push(e.id)
    });
    const fetch = await CareerMaterial.query()
      .where((query) => {
        query
          .whereIn('career_subcategory_id', wherein)
          .where('title', 'LIKE', '%' + search + '%')
      })
      .orderBy([
        {
          column: 'created_at',
          order: sortDesc ? 'desc' : 'asc',
        }
      ])
      .preload('subcategory')
      .preload('tag')
      .paginate(page, limit)
    return response.send({ status: true, data: fetch, msg: 'success' })
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const q = await CareerMaterial.query()
        .where('id', request.param('id'))
        .preload('subcategory')
        .preload('tag')
        .preload('content')
        .first()
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.abort(error)
    }
  }
}
