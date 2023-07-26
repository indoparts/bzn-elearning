import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import CareerMaterial from './CareerMaterial'

export default class CareerMaterialTag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public career_material_id: number
  @column()
  public created_by: number
  @column()
  public tags: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  // relationship
  @belongsTo(() => CareerMaterial, {
    foreignKey: 'career_material_id',
    localKey: 'id'
  })
  public career_material: BelongsTo<typeof CareerMaterial>
  @belongsTo(() => User, {
    foreignKey: 'created_by',
    localKey: 'id'
  })
  public createdby: BelongsTo<typeof User>
}
