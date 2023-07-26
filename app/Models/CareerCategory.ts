import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import ClientCareerCategory from './ClientCareerCategory'
import CareerSubcategory from './CareerSubcategory'

export default class CareerCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

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

  // relationship
  @belongsTo(() => User, {
    foreignKey: 'created_by',
    localKey: 'id'
  })
  public createdby: BelongsTo<typeof User>
  @belongsTo(() => ClientCareerCategory, {
    localKey: 'id',
    foreignKey: 'learning_category_id',
  })
  public client: BelongsTo<typeof ClientCareerCategory>
  @hasMany(() => CareerSubcategory, {
    localKey: 'id',
    foreignKey: 'career_category_id'
  })
  public subcategory: HasMany<typeof CareerSubcategory>
}
