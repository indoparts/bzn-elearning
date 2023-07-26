import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client';

export default class BerandasController {
  public async index({ view, request, response }: HttpContextContract) {
    if (request.ajax()) {
      const input = request.all()
      const search = input['search'].value;
      const limit = input['length'];
      const fetch = await Client.query()
        .where((q) => {
          q
          .where('frontname', 'LIKE', '%' + search + '%')
          .orWhere('midname', 'LIKE', '%' + search + '%')
          .orWhere('backname', 'LIKE', '%' + search + '%')
          .orWhere('fullname', 'LIKE', '%' + search + '%')
          .orWhere('username', 'LIKE', '%' + search + '%')
          .orWhere('email', 'LIKE', '%' + search + '%')
          .orWhere('status', 'LIKE', '%' + search + '%')
        })
        .orderBy('id', 'desc')
        .paginate((input['start'] / limit) + 1, limit)
      return response.send({ status: true, data: fetch, msg: 'success' })
    }
    const countMateriBelajar = await Database.from('learning_materials').count('* as total')
    const countKategoriBelajar = await Database.from('learning_categories').count('* as total')
    const countMateriKarir = await Database.from('career_materials').count('* as total')
    const countKategoriKarir = await Database.from('career_categories').count('* as total')
    return view.render('webAdmin/pages/beranda/index', { countMateriBelajar, countKategoriBelajar, countMateriKarir, countKategoriKarir })
  }

  public async create({ }: HttpContextContract) { }

  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
