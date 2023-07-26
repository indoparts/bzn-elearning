import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import LearningCategory from 'App/Models/LearningCategory'
import { datatables, uploadFile, uniqueDatime, unlinkFile } from 'App/helper'

export default class LearningCategoriesController {
  public async index({ view, request }: HttpContextContract) {
    if (request.ajax()) {
      return datatables(request.all(),
        'learning_categories',
        ['id', 'created_by', 'icon', 'name', 'created_at', 'updated_at'],
        {
          typeact: 'btn',
          attr: [
            { btntext: 'Lihat', icon: '<i class="fa-solid fa-file"></i>', url: 'learning-category', permission: 'read-client' },
            { btntext: 'Ubah', icon: '<i class="fa-solid fa-pen-to-square"></i>', url: 'learning-category', permission: 'update-client' },
            { btntext: 'Hapus', icon: '<i class="fa-sharp fa-solid fa-trash"></i>', url: 'learning-category', permission: 'delete-permission' }
          ]
        }
      )
    }
    return view.render('webAdmin/pages/LearningCategory/index')
  }

  public async store({ request, auth, session, response }: HttpContextContract) {
    try {
      const newPostSchema = schema.create({
        name: schema.string(),
        icon: schema.file({
          size: '2mb',
          extnames: ['jpg', 'svg', 'png'],
        }),
        subcategory_name: schema.array().members(schema.string()),
        subcategoryicon: schema.array().members(schema.file({
          size: '2mb',
          extnames: ['jpg', 'svg', 'png'],
        })),
      })
      const payload = await request.validate({ schema: newPostSchema })
      let unique = auth.user?.id + '-' + auth.user?.username + '-' + uniqueDatime(new Date())
      const categoryData: any[] = []
      const subCategoryData: any[] = []
      categoryData['name'] = payload.name
      categoryData['created_by'] = auth.user?.id
      if (payload.icon) {
        let nameFileCategory = `category-learning-${unique}`
        uploadFile(payload.icon, nameFileCategory, 'upload/category-learning')
        categoryData['icon'] = `${nameFileCategory}.${payload.icon.extname}`
        if (payload.subcategoryicon) {
          for (let i = 0; i < payload.subcategoryicon.length; i++) {
            let namefile = `sub-category-learning-${unique}`
            uploadFile(payload.subcategoryicon[i], namefile, 'upload/sub-category-learning')
            const entname = `${namefile}.${payload.subcategoryicon[i].extname}`
            subCategoryData.push({ icon: entname, name: payload.subcategory_name[i], created_by: auth.user?.id })
          }
        }
      }
      const category = new LearningCategory()
      category.created_by = parseInt(categoryData['created_by'])
      category.icon = categoryData['icon']
      category.name = categoryData['name']
      if (await category.save()) {
        await category.related('subcategory').createMany(subCategoryData)
      }
      session.flash({ notification: 'Data Berhasil Disimpan!' })
      return response.redirect().toRoute('web/LearningCategoriesController.index')
    } catch (error) {
      session.flash({ notification: error })
      return response.redirect().toRoute('web/LearningCategoriesController.index')
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const q = await LearningCategory.find(request.param('id'))
      return response.ok(q);
    } catch (error) {
      return response.abort(error)
    }
  }

  public async edit({ request, response }: HttpContextContract) {
    try {
      const q = await LearningCategory.find(request.param('id'))
      return response.ok(q);
    } catch (error) {
      return response.abort(error)
    }
  }

  public async update({ request, response, auth, session }: HttpContextContract) {
    try {
      const newPostSchema = schema.create({
        name: schema.string(),
        icon_update: schema.file({
          size: '2mb',
          extnames: ['jpg', 'svg', 'png'],
        }),
      })
      const payload = await request.validate({ schema: newPostSchema })
      let unique = auth.user?.id + '-' + auth.user?.username + '-' + uniqueDatime(new Date())
      const q = await LearningCategory.findOrFail(request.param('id'))
      q.name = payload.name
      if (payload.icon_update) {
        unlinkFile(q.icon, 'upload/category-learning')
        let nameFileCategory = `category-learning-${unique}`
        uploadFile(payload.icon_update, nameFileCategory, 'upload/category-learning')
        q.icon = `${nameFileCategory}.${payload.icon_update.extname}`
      }
      await q.save()
      session.flash({ notification_update: 'Data Berhasil Disimpan!', status: 'success' })
      return response.redirect().toRoute('web/LearningCategoriesController.index')
    } catch (error) {
      session.flash({ notification_update: error.responseText, status: 'danger' })
      return response.redirect().toRoute('web/LearningCategoriesController.index')
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const q = await LearningCategory.findOrFail(request.param('id'))
      unlinkFile(q.icon, 'upload/category-learning')
      await q.delete()
      return response.send({ status: true, data: {}, msg: 'success' })
    } catch (error) {
      return response.send({ status: false, data: error.messages, msg: 'errors' })
    }
  }
  public async findData({ request, response }: HttpContextContract) {
    try {
      const input = request.all()
      const q = await LearningCategory.query().where('name', 'LIKE', '%' + input['q'] + '%')
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.send({ status: false, data: error, msg: 'errors' })
    }
  }
}

