import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import CareerCategory from 'App/Models/CareerCategory'
import CareerSubcategory from 'App/Models/CareerSubcategory'
import { datatables, uniqueDatime, unlinkFile, uploadFile } from 'App/helper'

export default class CareerSubcategoriesController {
  public async index({ request, view }: HttpContextContract) {
    if (request.ajax()) {
      return datatables(request.all(),
        'career_subcategories',
        ['id', 'icon', 'name', 'created_at', 'updated_at'],
        {
          typeact: 'btn',
          attr: [
            { btntext: 'Lihat', icon: '<i class="fa-solid fa-file"></i>', url: 'career-subcategory', permission: 'read-client' },
            { btntext: 'Ubah', icon: '<i class="fa-solid fa-pen-to-square"></i>', url: 'career-subcategory', permission: 'update-client' },
            { btntext: 'Hapus', icon: '<i class="fa-sharp fa-solid fa-trash"></i>', url: 'career-subcategory', permission: 'delete-permission' }
          ]
        }
      )
    }
    return view.render('webAdmin/pages/CareerSubcategory/index')
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    const newPostSchema = schema.create({
      career_categories_id: schema.string(),
      name: schema.string(),
      icon: schema.file({
        size: '2mb',
        extnames: ['jpg', 'svg', 'png'],
      }),
    })
    const payload = await request.validate({ schema: newPostSchema })
    let unique = auth.user?.id + '-' + auth.user?.username + '-' + uniqueDatime(new Date())
    let namefile = `sub-category-career-${unique}`
    uploadFile(payload.icon, namefile, 'upload/sub-category-career')
    const entname = `${namefile}.${payload.icon.extname}`
    const post = new CareerSubcategory()
    post.name = payload['name']
    post.icon = entname
    const q = await CareerCategory.find(payload['career_categories_id'])
    q?.related('subcategory').save(post)
    session.flash({ notification: 'Data Berhasil Disimpan!' })
    return response.redirect().toRoute('web/CareerSubcategoriesController.index')
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const q = await CareerSubcategory.query().where('id', request.param('id')).preload('category')
      return response.ok(q);
    } catch (error) {
      return response.abort(error)
    }
  }

  public async edit({ request, response }: HttpContextContract) {
    try {
      const q = await CareerSubcategory.query().where('id', request.param('id')).preload('category')
      return response.ok(q);
    } catch (error) {
      return response.abort(error)
    }
  }

  public async update({ request, auth, session, response }: HttpContextContract) {
    const newPostSchema = schema.create({
      career_categories_id: schema.string(),
      name: schema.string(),
      icon: schema.file({
        size: '2mb',
        extnames: ['jpg', 'svg', 'png'],
      }),
    })
    const payload = await request.validate({ schema: newPostSchema })
    const post = await CareerSubcategory.findOrFail(request.param('id'))
    unlinkFile(post.icon, 'upload/sub-category-career')
    let unique = auth.user?.id + '-' + auth.user?.username + '-' + uniqueDatime(new Date())
    let namefile = `sub-category-career-${unique}`
    uploadFile(payload.icon, namefile, 'upload/sub-category-career')
    const entname = `${namefile}.${payload.icon.extname}`
    post.name = payload['name']
    post.icon = entname
    const q = await CareerCategory.find(payload['career_categories_id'])
    q?.related('subcategory').save(post)
    session.flash({ notification: 'Data Berhasil Disimpan!', status: 'success' })
    return response.redirect().toRoute('web/CareerSubcategoriesController.index')
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const q = await CareerSubcategory.findOrFail(request.param('id'))
      unlinkFile(q.icon, 'upload/sub-category-career')
      await q.delete()
      return response.send({ status: true, data: {}, msg: 'success' })
    } catch (error) {
      return response.send({ status: false, data: error.messages, msg: 'errors' })
    }
  }
}
