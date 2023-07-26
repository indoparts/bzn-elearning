import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import CareerCategory from './CareerCategory'

export default class ClientCareerCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public career_category_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client, {
    foreignKey: 'client_id',
    localKey: 'id',
  })
  public client: BelongsTo<typeof Client>
  
  @hasMany(() => CareerCategory, {
    localKey: 'id',
    foreignKey: 'career_category_id'
  })
  public category: HasMany<typeof CareerCategory>
}
