import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import CareerCategory from 'App/Models/CareerCategory'
import Client from 'App/Models/Client'
import ClientLearningCategory from 'App/Models/ClientLearningCategory'
import LearningCategory from 'App/Models/LearningCategory'

export default class ClassificationController {
    public async SetCareerCategory({ request, response, auth }: HttpContextContract) {
        try {
            const payload = await request.validate({
                schema: schema.create({
                    career_category_id: schema
                        .array([
                            rules.minLength(1),
                            rules.maxLength(3)
                        ])
                        .members(schema.number()),

                })
            })
            const data: any[] = []
            payload.career_category_id.forEach(e => {
                data.push({
                    career_category_id: e,
                    client_id: auth.user?.id
                })
            });
            const client = await Client.findOrFail(auth.user!.id)
            await client
                .related('career_category')
                .updateOrCreateMany(data, 'client_id')
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            return response.abort(error)
        }
    }
    public async SetCareerStages({ request, response, auth }: HttpContextContract) {
        try {
            const payload = await request.validate({
                schema: schema.create({
                    stages: schema.enum([
                        'mencari promosi',
                        'saat ini menganggur',
                        'memulai karir',
                        'ingin mengubah karir',
                        'baru saja dipromosikan',
                        'masuk kembali ke tempat kerja',
                        'saat ini di universitas',
                        'peningkatan keterampilan dalam pekerjaan saat ini',
                    ]),
                })
            })
            payload['client_id'] = auth.user?.id
            const client = await Client.findOrFail(auth.user?.id)
            await client
                .related('stages')
                .updateOrCreate({}, {
                    stages: payload.stages,
                })
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            return response.abort(error)
        }
    }
    public async SetGoals({ request, response, auth }: HttpContextContract) {
        try {
            const payload = await request.validate({
                schema: schema.create({
                    goals: schema.enum(['perbaharuan kemampuan', 'mengeksplorasi hobi & minat', 'mengubah bidang karir']),
                })
            })
            payload['client_id'] = auth.user?.id
            const client = await Client.findOrFail(auth.user?.id)
            await client
                .related('goal')
                .updateOrCreate({}, {
                    goals: payload.goals,
                })
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            return response.abort(error)
        }
    }
    public async SetLearningCategory({ request, response, auth }: HttpContextContract) {
        try {
            const payload = await request.validate({
                schema: schema.create({
                    learning_category_id: schema
                        .array([
                            rules.minLength(1),
                            rules.maxLength(3)
                        ])
                        .members(schema.number()),

                })
            })
            const data: any[] = []
            payload.learning_category_id.forEach(e => {
                data.push({
                    learning_category_id: e,
                    client_id: auth.user?.id
                })
            });
            const client = await Client.findOrFail(auth.user!.id)
            await client
                .related('learning_category')
                .updateOrCreateMany(data, 'client_id')
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            return response.abort(error)
        }
    }
    public async SetLearningSubCategory({ request, response, auth }: HttpContextContract) {
        try {
            const payload = await request.validate({
                schema: schema.create({
                    learning_subcategory_id: schema
                        .array([
                            rules.minLength(3),
                            rules.maxLength(9)
                        ])
                        .members(schema.number()),

                })
            })
            const data: any[] = []
            payload.learning_subcategory_id.forEach(e => {
                data.push({
                    learning_subcategory_id: e,
                    client_id: auth.user?.id
                })
            });
            const client = await Client.findOrFail(auth.user!.id)
            await client
                .related('learning_subcategory')
                .updateOrCreateMany(data, 'client_id')
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            return response.abort(error)
        }
    }
    public async stages({ response }: HttpContextContract) {
        return response.send({
            status: true, data: [
                'mencari promosi',
                'saat ini menganggur',
                'memulai karir',
                'ingin mengubah karir',
                'baru saja dipromosikan',
                'masuk kembali ke tempat kerja',
                'saat ini di universitas',
                'peningkatan keterampilan dalam pekerjaan saat ini',
            ], msg: 'success'
        })
    }
    public async goals({ response }: HttpContextContract) {
        return response.send({ status: true, data: ['perbaharuan kemampuan', 'mengeksplorasi hobi & minat', 'mengubah bidang karir'], msg: 'success' })
    }
    public async careerCategory({ request, response }: HttpContextContract) {
        try {
            const page = request.input('page', 1)
            const limit = request.input('limit', 1)
            const fetch = await CareerCategory.query()
                .preload('subcategory')
                .paginate(page, limit)
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            console.log(error);
        }
    }
    public async learningCategory({ request, response }: HttpContextContract) {
        try {
            const page = request.input('page', 1)
            const limit = request.input('limit', 1)
            const fetch = await LearningCategory.query()
                .preload('subcategory')
                .paginate(page, limit)
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            console.log(error);
        }
    }
    public async learningSubcategory({ response, auth }: HttpContextContract) {
        try {
            const f = await ClientLearningCategory.query().where('client_id', auth.user!.id)
            const arr: number[] = []
            f.forEach(e => {
                arr.push(e.id)
            });
            const fetch = await LearningCategory
                .query()
                .whereIn('id', arr)
                .preload('subcategory')
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            console.log(error);
        }
    }
}
