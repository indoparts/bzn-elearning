import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CareerMaterial from './CareerMaterial'
import CareerCategory from './CareerCategory'
import User from './User'

export default class CareerSubcategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public career_category_id: number
  @column()
  public created_by: number
  @column()
  public icon: string
  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'created_by',
    localKey: 'id'
  })
  public createdby: BelongsTo<typeof User>
  @belongsTo(() => CareerCategory, {
    foreignKey: 'career_category_id',
    localKey: 'id',
  })
  public category: BelongsTo<typeof CareerCategory>
  @hasMany(() => CareerMaterial, {
    localKey: 'id',
    foreignKey: 'career_subcategory_id'
  })
  public subcategory: HasMany<typeof CareerMaterial>
}
