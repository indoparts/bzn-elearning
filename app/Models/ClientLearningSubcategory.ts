import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import LearningSubcategory from './LearningSubcategory'

export default class ClientLearningSubcategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number
  @column()
  public learning_subcategory_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client, {
    foreignKey: 'client_id',
    localKey: 'id',
  })
  public client: BelongsTo<typeof Client>

  @hasMany(() => LearningSubcategory, {
    localKey: 'id',
    foreignKey: 'learning_subcategory_id'
  })
  public category: HasMany<typeof LearningSubcategory>
}
