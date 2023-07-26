import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class AgreementDatum extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public created_by: number
  @column()
  public title: string
  @column()
  public content: string
  @column()
  public status: string
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'created_by',
    localKey: 'id',
  })
  public user: BelongsTo<typeof User>
}
