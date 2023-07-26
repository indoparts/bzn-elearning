import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import CareerCategory from 'App/Models/CareerCategory'
import { datatables, uploadFile, uniqueDatime, unlinkFile } from 'App/helper'

export default class CareerCategoriesController {
  public async index({ view, request }: HttpContextContract) {
    if (request.ajax()) {
      return datatables(request.all(),
        'career_categories',
        ['id', 'created_by', 'icon', 'name', 'created_at', 'updated_at'],
        {
          typeact: 'btn',
          attr: [
            { btntext: 'Lihat', icon: '<i class="fa-solid fa-file"></i>', url: 'career-category', permission: 'read-client' },
            { btntext: 'Ubah', icon: '<i class="fa-solid fa-pen-to-square"></i>', url: 'career-category', permission: 'update-client' },
            { btntext: 'Hapus', icon: '<i class="fa-sharp fa-solid fa-trash"></i>', url: 'career-category', permission: 'delete-permission' }
          ]
        }
      )
    }
    return view.render('webAdmin/pages/CareerCategory/index')
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
        let nameFileCategory = `category-career-${unique}`
        uploadFile(payload.icon, nameFileCategory, 'upload/category-career')
        categoryData['icon'] = `${nameFileCategory}.${payload.icon.extname}`
        if (payload.subcategoryicon) {
          for (let i = 0; i < payload.subcategoryicon.length; i++) {
            let namefile = `sub-category-career-${unique}`
            uploadFile(payload.subcategoryicon[i], namefile, 'upload/sub-category-career')
            const entname = `${namefile}.${payload.subcategoryicon[i].extname}`
            subCategoryData.push({ icon: entname, name: payload.subcategory_name[i], created_by: auth.user?.id })
          }
        }
      }
      const category = new CareerCategory()
      category.created_by = parseInt(categoryData['created_by'])
      category.icon = categoryData['icon']
      category.name = categoryData['name']
      if (await category.save()) {
        await category.related('subcategory').createMany(subCategoryData)
      }
      session.flash({ notification: 'Data Berhasil Disimpan!' })
      return response.redirect().toRoute('web/CareerCategoriesController.index')
    } catch (error) {
      session.flash({ notification: error })
      return response.redirect().toRoute('web/CareerCategoriesController.index')
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const q = await CareerCategory.find(request.param('id'))
      return response.ok(q);
    } catch (error) {
      return response.abort(error)
    }
  }

  public async edit({ request, response }: HttpContextContract) {
    try {
      const q = await CareerCategory.find(request.param('id'))
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
      const q = await CareerCategory.findOrFail(request.param('id'))
      q.name = payload.name
      if (payload.icon_update) {
        unlinkFile(q.icon, 'upload/category-career')
        let nameFileCategory = `category-career-${unique}`
        uploadFile(payload.icon_update, nameFileCategory, 'upload/category-career')
        q.icon = `${nameFileCategory}.${payload.icon_update.extname}`
      }
      await q.save()
      session.flash({ notification_update: 'Data Berhasil Disimpan!', status: 'success' })
      return response.redirect().toRoute('web/CareerCategoriesController.index')
    } catch (error) {
      session.flash({ notification_update: error.responseText, status: 'danger' })
      return response.redirect().toRoute('web/CareerCategoriesController.index')
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const q = await CareerCategory.findOrFail(request.param('id'))
      unlinkFile(q.icon, 'upload/category-career')
      await q.delete()
      return response.send({ status: true, data: {}, msg: 'success' })
    } catch (error) {
      return response.send({ status: false, data: error.messages, msg: 'errors' })
    }
  }
  public async findData({ request, response }: HttpContextContract) {
    try {
      const input = request.all()
      const q = await CareerCategory.query().where('name', 'LIKE', '%' + input['q'] + '%')
      return response.send({ status: true, data: q, msg: 'success' })
    } catch (error) {
      return response.send({ status: false, data: error, msg: 'errors' })
    }
  }
}

