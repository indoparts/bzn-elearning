import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import ClientLearningCategory from './ClientLearningCategory'
import LearningSubcategory from './LearningSubcategory'

export default class LearningCategory extends BaseModel {
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
    localKey: 'id',
  })
  public createdby: BelongsTo<typeof User>
  @belongsTo(() => ClientLearningCategory, {
    localKey: 'id',
    foreignKey: 'learning_category_id',
  })
  public client: BelongsTo<typeof ClientLearningCategory>
  @hasMany(() => LearningSubcategory, {
    localKey: 'id',
    foreignKey: 'learning_category_id'
  })
  public subcategory: HasMany<typeof LearningSubcategory>
}
