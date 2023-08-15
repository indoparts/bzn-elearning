import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import LearningCategory from './LearningCategory'
import User from './User'
import LearningMaterial from './LearningMaterial'

export default class LearningSubcategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public learning_category_id: number
  @column()
  public created_by: number
  @column()
  public icon: string
  @column()
  public cover_image: string
  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationship
  @belongsTo(() => User, {
    foreignKey: 'created_by',
    localKey: 'id',
  })
  public createdby: BelongsTo<typeof User>
  @belongsTo(() => LearningCategory, {
    foreignKey: 'learning_category_id',
    localKey: 'id',
  })
  public category: BelongsTo<typeof LearningCategory>
  @hasMany(() => LearningMaterial, {
    localKey: 'id',
    foreignKey: 'learning_subcategory_id'
  })
  public subcategory: HasMany<typeof LearningMaterial>
}
