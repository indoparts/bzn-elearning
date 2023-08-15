import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CareerSubcategoryInfo extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public career_subcategory_id: number
  @column()
  public title: string
  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
