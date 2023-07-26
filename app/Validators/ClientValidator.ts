import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Messages'

export class ClientCreateValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    frontname: schema.string(),
    midname: schema.string(),
    backname: schema.string(),
    fullname: schema.string(),
    username: schema.string([rules.unique({ table: 'clients', column: 'username' })]),
    email: schema.string([rules.email(), rules.unique({ table: 'clients', column: 'email' })]),
    password: schema.string(),
    status: schema.enum(['active', 'inactive', 'block'])
  })
}
export class ClientUpdateValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public refs = schema.refs({
    id: this.ctx.params.id
  })
  public schema = schema.create({
    frontname: schema.string(),
    midname: schema.string(),
    backname: schema.string(),
    fullname: schema.string(),
    username: schema.string([rules.unique({ table: 'clients', column: 'username', whereNot: { id: this.refs.id } })]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'clients', column: 'email', whereNot: { id: this.refs.id } })
    ]),
    password: schema.string(),
    status: schema.enum(['active', 'inactive', 'block'])
  })
}
