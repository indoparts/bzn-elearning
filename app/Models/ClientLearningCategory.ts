import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import LearningCategory from './LearningCategory'
import LearningSubcategory from './LearningSubcategory'

export default class ClientLearningCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number
  @column()
  public learning_category_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client, {
    foreignKey: 'client_id',
    localKey: 'id',
  })
  public client: BelongsTo<typeof Client>

  @hasMany(() => LearningCategory, {
    localKey: 'id',
    foreignKey: 'learning_category_id'
  })
  public category: HasMany<typeof LearningCategory>

  @belongsTo(() => LearningSubcategory, {
    foreignKey: 'learning_category_id',
    localKey: 'learning_category_id',
  })
  public subcategory: BelongsTo<typeof LearningSubcategory>
}
