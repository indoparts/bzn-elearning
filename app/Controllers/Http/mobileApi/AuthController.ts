import Mail from '@ioc:Adonis/Addons/Mail';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Client from 'App/Models/Client';
import User from 'App/Models/User';
import { ClientCreateValidator } from 'App/Validators/ClientValidator';
import { LoginValidator } from 'App/Validators/UserValidator';
import Encryption from '@ioc:Adonis/Core/Encryption'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
    /*
    |--------------------------------------------------------------------------
    | REGISTER::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async register({ request, response }: HttpContextContract) {
        try {
            request.all()['status'] = 'inactive'
            const payload = await request.validate(ClientCreateValidator)
            const encrypted = Encryption.encrypt(payload)
            await Mail.send((message) => {
                message
                    .from('bizani.learning.center@example.com')
                    .to(payload.email)
                    .subject('Welcome Onboard!')
                    .htmlView('emails/welcome', {
                        data: payload,
                        url: `${Env.get('BASEURL')}client/auth/email-verify/${encrypted}`
                    })
            })
            const q = new Client()
            q.merge(payload)
            await q.save()

            q['password']='secreet client is not publish!'
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            if (error.code === 'E_VALIDATION_FAILURE') {
                return response.abort({ status: false, data: error.messages, msg: 'errors' }, 422)
            } else if (error.code === "E_INVALID_AUTH_UID") {
                return response.abort({ status: false, data: error.responseText, msg: 'errors' }, 401)
            } else {
                return response.abort(error)
            }
        }
    }
    /*
    |--------------------------------------------------------------------------
    | LOGIN::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async login({ request, auth, response }: HttpContextContract) {
        try {
            const payload = await request.validate(LoginValidator)
            const token = await auth.use("api").attempt(payload.email, payload.password, {
                expiresIn: "1 days",
            });
            auth.user!['password']='secreet is not publish!'
            return response.send({ status: true, data: {
                auth:token.toJSON(),
                clients:auth.user
            }, msg: 'success' })
        } catch (error) {
            if (error.code === 'E_VALIDATION_FAILURE') {
                return response.abort({ status: false, data: error.messages, msg: 'errors' }, 422)
            } else if (error.code === "E_INVALID_AUTH_UID") {
                return response.abort({ status: false, data: error.responseText, msg: 'errors' }, 401)
            } else {
                return response.abort(error)
            }
        }
    }
    /*
    |--------------------------------------------------------------------------
    | LOGIN::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async verifymail({ request, response, auth }: HttpContextContract) {
        try {
            const decrypted = Encryption.decrypt(request.param('data'))
            const q = await Client.findByOrFail('email', decrypted!['email'])
            q.status = 'active'
            await q.save()
            const token = await auth.use("api").attempt(decrypted!['email'], decrypted!['password'], {
                expiresIn: "1 days",
            });
            return response.send({ status: true, data: token.toJSON(), msg: 'success' })
        } catch (error) {
            return response.abort({ status: false, data: error.code, msg: 'errors' })
        }
    }
    /*
    |--------------------------------------------------------------------------
    | PROFILE::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async profile({ auth, response }: HttpContextContract) {
        try {
            const data = auth.user!
            data['password'] = 'secret password not showing for secure data protection!'
            return response.send({ status: true, data: data, msg: 'success' })
        } catch (error) {
            return response.abort({ status: false, data: error.responseText, msg: 'errors' }, 500)
        }
    }
    /*
    |--------------------------------------------------------------------------
    | PROFILE UPDATE::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async profileUpdate({ response, request, auth }: HttpContextContract) {
        try {
            const payload = await request.validate({
                schema: schema.create({
                    frontname: schema.string.optional(),
                    midname: schema.string.optional(),
                    backname: schema.string.optional(),
                    fullname: schema.string.optional(),
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
                    password: schema.string.optional([
                        rules.confirmed(),
                        rules.minLength(4)
                    ])
                })
            })

            const q = await Client.findOrFail(auth.user?.id)
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
    /*
    |--------------------------------------------------------------------------
    | LOGOUT::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async logout({ auth, response }: HttpContextContract) {
        try {
            if (await auth.check()) {
                const updateUser = await User.findOrFail(auth.user?.id)
                if (await updateUser.save()) {
                    auth.use("api").logout()
                    await auth.use('api').revoke()
                }
            }
            return response.send({ status: true, data: {}, msg: (await auth.check()) ? 'Invalid Credential' : 'Success logout' })
        } catch (error) {
            return response.send({ status: false, data: error.responseText, msg: 'errors' })
        }
    }
}
