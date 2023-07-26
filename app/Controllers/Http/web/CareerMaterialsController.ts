import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import CareerMaterial from 'App/Models/CareerMaterial'
import CareerMaterialContent from 'App/Models/CareerMaterialContent';
import CareerMaterialTag from 'App/Models/CareerMaterialTag';
import CareerSubcategory from 'App/Models/CareerSubcategory';
import { DateTimeFormated, slugify } from 'App/helper';

export default class CareerMaterialsController {
  public async index({ view, request, response }: HttpContextContract) {
    if (request.ajax()) {
      const input = request.all()
      const search = input['search'].value;
      const limit = input['length'];
      const tgl1 = input['tgl1']||DateTimeFormated('YYYY-MM-DD', new Date());
      const tgl2 = input['tgl2']||DateTimeFormated('YYYY-MM-DD', new Date());

      const fetch = await CareerMaterial.query().where('title', 'LIKE', '%' + search + '%')
      .whereBetween('created_at', [tgl1, tgl2])
        .orderBy('id', 'desc')
        .preload('content')
        .preload('createdby')
        .preload('subcategory')
        .preload('tag')
        .paginate((input['start'] / limit) + 1, limit)
      return response.send({ status: true, data: fetch, msg: 'success' })
    }
    return view.render('webAdmin/pages/CareerMaterial/index')
  }

  public async create({ view }: HttpContextContract) {
    const subkategori = await CareerSubcategory.query().limit(10)
    const halaman: any[] = []
    for (let i = 1; i <= 100; i++) {
      halaman.push(i)
    }
    return view.render('webAdmin/pages/CareerMaterial/form', { act: 'create', subkategori, halaman: halaman })
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    try {
      const newPostSchema = schema.create({
        title_materi: schema.string(),
        title: schema.array().members(schema.string()),
        content: schema.array().members(schema.string()),
        career_categories_id: schema.number(),
        tags_materi: schema.string(),
      })
      const payload = await request.validate({ schema: newPostSchema })
      const q1 = new CareerMaterial()
      q1.career_subcategory_id = payload.career_categories_id
      q1.created_by = auth.user!.id
      q1.title = payload.title_materi
      if (await q1.save()) {
        const t = payload.tags_materi.split(",");
        const myTags: any[] = []
        const myContent: any[] = []
        t.forEach(e => {
          myTags.push({
            created_by: auth.user!.id,
            tags: e
          })
        });
        for (let i = 0; i < payload.title.length; i++) {
          myContent.push({
            created_by: auth.user!.id,
            page: i + 1,
            title_page: payload.title[i],
            content_page: payload.content[i],
            desc: payload.content[i],
            slug: slugify(payload.title[i])
          })
        }
        q1.related('tag').createMany(myTags)
        q1.related('content').createMany(myContent)
      }
      session.flash({ notification: 'Data Berhasil Disimpan!', status: 'success' })
      return response.redirect().toRoute('web/CareerMaterialsController.index')
    } catch (error) {
      session.flash({ notification: error, status: 'danger' })
      return response.redirect().toRoute('web/CareerMaterialsController.create')
    }
  }

  public async show({ request, response, view }: HttpContextContract) {
    try {
      const subkategori = await CareerSubcategory.query().limit(10)
      const halaman: any[] = []
      const tag: any[] = []
      for (let i = 1; i <= 100; i++) {
        halaman.push(i)
      }
      const q = await CareerMaterial
        .query()
        .where('id', request.param('id'))
        .preload('content')
        .preload('createdby')
        .preload('subcategory')
        .preload('tag')
        .first()
      q?.tag.forEach(el => {
        tag.push(el.tags)
      });

      return view.render('webAdmin/pages/CareerMaterial/form', { act: 'update', subkategori, halaman: halaman, materi: q, tags: tag, content:JSON.stringify(q?.content) })
    } catch (error) {
      return response.abort(error)
    }
  }

  public async edit({ request, response, view }: HttpContextContract) {
    try {
      const subkategori = await CareerSubcategory.query().limit(10)
      const halaman: any[] = []
      const tag: any[] = []
      for (let i = 1; i <= 100; i++) {
        halaman.push(i)
      }
      const q = await CareerMaterial
        .query()
        .where('id', request.param('id'))
        .preload('content')
        .preload('createdby')
        .preload('subcategory')
        .preload('tag')
        .first()
      q?.tag.forEach(el => {
        tag.push(el.tags)
      });

      return view.render('webAdmin/pages/CareerMaterial/form', { act: 'update', subkategori, halaman: halaman, materi: q, tags: tag, content:JSON.stringify(q?.content) })
    } catch (error) {
      return response.abort(error)
    }
  }

  public async update({ request, auth, session, response }: HttpContextContract) {
    try {
      const newPostSchema = schema.create({
        title_materi: schema.string(),
        title: schema.array().members(schema.string()),
        content: schema.array().members(schema.string()),
        career_categories_id: schema.number(),
        tags_materi: schema.string(),
      })
      const payload = await request.validate({ schema: newPostSchema })
      const q1 = await CareerMaterial.findOrFail(request.param('id'))
      q1.career_subcategory_id = payload.career_categories_id
      q1.created_by = auth.user!.id
      q1.title = payload.title_materi
      if (await q1.save()) {
        await CareerMaterialTag.query().where('career_material_id', request.param('id')).delete()
        await CareerMaterialContent.query().where('career_material_id', request.param('id')).delete()
        const t = payload.tags_materi.split(",");
        const myTags: any[] = []
        const myContent: any[] = []
        t.forEach(e => {
          myTags.push({
            created_by: auth.user!.id,
            tags: e
          })
        });
        for (let i = 0; i < payload.title.length; i++) {
          myContent.push({
            created_by: auth.user!.id,
            page: i + 1,
            title_page: payload.title[i],
            content_page: payload.content[i],
            desc: payload.content[i],
            slug: slugify(payload.title[i])
          })
        }
        q1.related('tag').createMany(myTags)
        q1.related('content').createMany(myContent)
      }
      session.flash({ notification: 'Data Berhasil Disimpan!', status: 'success' })
      return response.redirect().toRoute('web/CareerMaterialsController.index')
    } catch (error) {
      console.log(error);

      session.flash({ notification: error, status: 'danger' })
      return response.redirect().toRoute('web/CareerMaterialsController.create')
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const q = await CareerMaterial.findOrFail(request.param('id'))
      await q.delete()
      return response.send({ status: true, data: {}, msg: 'success' })
    } catch (error) {
      return response.send({ status: false, data: error.messages, msg: 'errors' })
    }
  }
}
