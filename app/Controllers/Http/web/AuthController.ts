import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import User from 'App/Models/User';
import { LoginValidator } from 'App/Validators/UserValidator';
import { GetProfile } from 'App/actions/AuthActions';

export default class AuthController {
    public async login({ view }: HttpContextContract) {
        return view.render('webAdmin/pages/login/index')
    }
    public async loginAct({ request, auth, response }: HttpContextContract) {
        const payload = await request.validate(LoginValidator)
        await auth.use("web").attempt(payload.email, payload.password)
        response.redirect().toPath('/beranda')
    }
    public async profile({ auth, response, view, request }: HttpContextContract) {
        try {
            const page = request.input('page', 1)
            const limit = 10

            const profile = GetProfile(auth.user?.id)
            const activity = await Database
                .query()
                .with('aliased_table', (query) => {
                    query.from('learning_categories').select(Database.raw('id, created_by, name as title, created_at, updated_at, "learning_category" as initial')).unionAll([
                        Database.from('career_categories').select(Database.raw('id, created_by, name as title, created_at, updated_at, "career_category" as initial')),
                        Database.from('learning_subcategories').select(Database.raw('id, created_by, name as title, created_at, updated_at, "learning_subcategory" as initial')),
                        Database.from('career_subcategories').select(Database.raw('id, created_by, name as title, created_at, updated_at, "career_subcategory" as initial')),
                        Database.from('learning_materials').select(Database.raw('id, created_by, title, created_at, updated_at, "learning_material" as initial')),
                        Database.from('career_materials').select(Database.raw('id, created_by, title, created_at, updated_at, "career_material" as initial')),
                    ])
                })
                .select('*')
                .where('created_by', auth.user!.id)
                .orderBy('created_at', 'desc')
                .from('aliased_table')
                .paginate(page, limit)

            activity.baseUrl('/profile')
            activity['startPage'] = (page > 1) ? page - 1 : 1
            activity['endPage'] = (page < (activity.lastPage - 1))? parseInt(page)+1 : activity.lastPage
            console.log(activity);

            return view.render('webAdmin/pages/login/profile', { profile: (await profile).user, activity })
        } catch (error) {
            return response.abort({ status: false, data: error.responseText, msg: 'errors' }, 500)
        }
    }
    public async profileUpdate({ response, request, auth }: HttpContextContract) {
        try {
            const newPostSchema = schema.create({
                name: schema.string(),
                username: schema.string([
                    rules.unique({
                        table: 'users',
                        column: 'username',
                        whereNot: {
                            id: auth.user?.id,
                        },
                    })
                ]),
                email: schema.string([
                    rules.email(),
                    rules.unique({
                        table: 'users',
                        column: 'email',
                        whereNot: {
                            id: auth.user?.id,
                        },
                    })
                ]),
                password: schema.string(),
            })
            const payload = await request.validate({ schema: newPostSchema })
            const q = await User.findOrFail(auth.user?.id)
            q.merge(payload)
            await q.save()
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            if (error.code === 'E_VALIDATION_FAILURE') {
                return response.abort({ status: false, data: error.messages, msg: 'errors' }, 422)
            }
            return response.abort({ status: false, data: error.responseText, msg: 'errors' }, 500)
        }
    }
    public async logout({ auth, response }: HttpContextContract) {
        try {
            await auth.use('web').logout()
            response.redirect('/login')
        } catch (error) {
            return response.send({ status: false, data: error.responseText, msg: 'errors' })
        }
    }
}
