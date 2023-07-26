import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Messages'

export class UserCreateValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    role_id: schema.number(),
    name: schema.string(),
    username: schema.string([rules.unique({ table: 'users', column: 'username' })]),
    email: schema.string([rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string(),
  })
}
export class UserUpdateValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public refs = schema.refs({
    id: this.ctx.params.id
  })
  public schema = schema.create({
    role_id: schema.number(),
    name: schema.string(),
    username: schema.string([rules.unique({ table: 'users', column: 'username', whereNot: { id: this.refs.id } })]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.refs.id } })
    ]),
    password: schema.string(),
  })
}
export class LoginValidator extends Messages {
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    email: schema.string([
      rules.email()
    ]),
    password: schema.string(),
  })
}
