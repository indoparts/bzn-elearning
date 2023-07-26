import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Agreement from 'App/Models/Agreement'
import AgreementDatum from 'App/Models/AgreementDatum'

export default class AgreementsController {
    public async index({ response }: HttpContextContract) {
        try {
            const q = await AgreementDatum.query().where('status', 'active')
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
    public async storeOrUpdate({ request, response }: HttpContextContract) {
        try {
            const clientId = request.param('clientId')
            const searchPayload = { client_id: clientId }
            const persistancePayload = { status: 'agree' }
            const q = await Agreement.updateOrCreate(searchPayload, persistancePayload)
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
    public async cekClient({ request, response, auth }: HttpContextContract) {
        try {
            const param = request.input('param')
            switch (param) {
                case 'term-condition':
                    const tc = await await Database
                        .from('agreements')
                        .where('client_id', auth.user!.id)
                        .count('* as total')
                    return response.send({ status: (tc[0].total > 0) ? true : false, data: tc, msg: (tc[0].total > 0) ? 'done' : 'undone' })
                case 'reccomendation-1':
                    const rc1 = await await Database
                        .from('client_goals')
                        .where('client_id', auth.user!.id)
                        .count('* as total')
                    return response.send({ status: (rc1[0].total > 0) ? true : false, data: rc1, msg: (rc1[0].total > 0) ? 'done' : 'undone' })
                case 'reccomendation-2':
                    const rc2 = await await Database
                        .from('client_career_categories')
                        .where('client_id', auth.user!.id)
                        .count('* as total')
                    return response.send({ status: (rc2[0].total > 0) ? true : false, data: rc2, msg: (rc2[0].total > 0) ? 'done' : 'undone' })
                case 'reccomendation-3':
                    const rc3 = await await Database
                        .from('client_learning_categories')
                        .where('client_id', auth.user!.id)
                        .count('* as total')
                    return response.send({ status: (rc3[0].total > 0) ? true : false, data: rc3, msg: (rc3[0].total > 0) ? 'done' : 'undone' })
                case 'reccomendation-4':
                    const rc4 = await await Database
                        .from('client_learning_subcategories')
                        .where('client_id', auth.user!.id)
                        .count('* as total')
                    return response.send({ status: (rc4[0].total > 0) ? true : false, data: rc4, msg: (rc4[0].total > 0) ? 'done' : 'undone' })
                case 'reccomendation-5':
                    const rc5 = await await Database
                        .from('client_career_stages')
                        .where('client_id', auth.user!.id)
                        .count('* as total')
                    return response.send({ status: (rc5[0].total > 0) ? true : false, data: rc5, msg: (rc5[0].total > 0) ? 'done' : 'undone' })

                default:
                    const alltc = await await Database
                        .from('agreements')
                        .where('client_id', auth.user!.id)
                        .count('* as total')
                    const allrc1 = await await Database
                        .from('client_goals')
                        .where('client_id', auth.user!.id)
                        .count('* as total')
                    const allrc2 = await await Database
                        .from('client_career_categories')
                        .where('client_id', auth.user!.id)
                        .count('* as total')
                    const allrc3 = await await Database
                        .from('client_learning_categories')
                        .where('client_id', auth.user!.id)
                        .count('* as total')
                    const allrc4 = await await Database
                        .from('client_learning_subcategories')
                        .where('client_id', auth.user!.id)
                        .count('* as total')
                    const allrc5 = await await Database
                        .from('client_career_stages')
                        .where('client_id', auth.user!.id)
                        .count('* as total')
                    return response.send({
                        status: true, data: {
                            term_condition: alltc[0].total > 0 ? true : false,
                            reccomendation_1: allrc1[0].total > 0 ? true : false,
                            reccomendation_2: allrc2[0].total > 0 ? true : false,
                            reccomendation_3: allrc3[0].total > 0 ? true : false,
                            reccomendation_4: allrc4[0].total > 0 ? true : false,
                            reccomendation_5: allrc5[0].total > 0 ? true : false,
                        }, msg: 'success'
                    })
            }
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
}
