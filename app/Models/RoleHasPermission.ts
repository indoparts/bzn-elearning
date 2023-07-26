import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Permission from './Permission'

export default class RoleHasPermission extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public role_id: number
  @column()
  public permission_id: number
  @belongsTo(() => Role, {
    foreignKey: 'role_id',
  })
  public roles: BelongsTo<typeof Role>
  @belongsTo(() => Permission, {
    foreignKey: 'permission_id',
  })
  public permission: BelongsTo<typeof Permission>
}
