import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import LearningCategory from 'App/Models/LearningCategory'
import LearningSubcategory from 'App/Models/LearningSubcategory'
import { datatables, uniqueDatime, unlinkFile, uploadFile } from 'App/helper'

export default class LearningSubcategoriesController {
  public async index({ request, view }: HttpContextContract) {
    if (request.ajax()) {
      return datatables(request.all(),
        'learning_subcategories',
        ['id', 'icon', 'name', 'created_at', 'updated_at'],
        {
          typeact: 'btn',
          attr: [
            { btntext: 'Lihat', icon: '<i class="fa-solid fa-file"></i>', url: 'learning-subcategory', permission: 'read-client' },
            { btntext: 'Ubah', icon: '<i class="fa-solid fa-pen-to-square"></i>', url: 'learning-subcategory', permission: 'update-client' },
            { btntext: 'Hapus', icon: '<i class="fa-sharp fa-solid fa-trash"></i>', url: 'learning-subcategory', permission: 'delete-permission' }
          ]
        }
      )
    }
    return view.render('webAdmin/pages/LearningSubcategory/index')
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    const newPostSchema = schema.create({
      learning_categories_id: schema.string(),
      name: schema.string(),
      icon: schema.file({
        size: '2mb',
        extnames: ['jpg', 'svg', 'png'],
      }),
    })
    const payload = await request.validate({ schema: newPostSchema })
    let unique = auth.user?.id + '-' + auth.user?.username + '-' + uniqueDatime(new Date())
    let namefile = `sub-category-learning-${unique}`
    uploadFile(payload.icon, namefile, 'upload/sub-category-learning')
    const entname = `${namefile}.${payload.icon.extname}`
    const post = new LearningSubcategory()
    post.name = payload['name']
    post.icon = entname
    const q = await LearningCategory.find(payload['learning_categories_id'])
    q?.related('subcategory').save(post)
    session.flash({ notification: 'Data Berhasil Disimpan!' })
    return response.redirect().toRoute('web/LearningSubcategoriesController.index')
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const q = await LearningSubcategory.query().where('id', request.param('id')).preload('category')
      return response.ok(q);
    } catch (error) {
      return response.abort(error)
    }
  }

  public async edit({ request, response }: HttpContextContract) {
    try {
      const q = await LearningSubcategory.query().where('id', request.param('id')).preload('category')
      return response.ok(q);
    } catch (error) {
      return response.abort(error)
    }
  }

  public async update({ request, auth, session, response }: HttpContextContract) {
    const newPostSchema = schema.create({
      learning_categories_id: schema.string(),
      name: schema.string(),
      icon: schema.file({
        size: '2mb',
        extnames: ['jpg', 'svg', 'png'],
      }),
    })
    const payload = await request.validate({ schema: newPostSchema })
    const post = await LearningSubcategory.findOrFail(request.param('id'))
    unlinkFile(post.icon, 'upload/sub-category-learning')
    let unique = auth.user?.id + '-' + auth.user?.username + '-' + uniqueDatime(new Date())
    let namefile = `sub-category-learning-${unique}`
    uploadFile(payload.icon, namefile, 'upload/sub-category-learning')
    const entname = `${namefile}.${payload.icon.extname}`
    post.name = payload['name']
    post.icon = entname
    const q = await LearningCategory.find(payload['learning_categories_id'])
    q?.related('subcategory').save(post)
    session.flash({ notification: 'Data Berhasil Disimpan!', status: 'success' })
    return response.redirect().toRoute('web/LearningSubcategoriesController.index')
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const q = await LearningSubcategory.findOrFail(request.param('id'))
      unlinkFile(q.icon, 'upload/sub-category-learning')
      await q.delete()
      return response.send({ status: true, data: {}, msg: 'success' })
    } catch (error) {
      return response.send({ status: false, data: error.messages, msg: 'errors' })
    }
  }
}
