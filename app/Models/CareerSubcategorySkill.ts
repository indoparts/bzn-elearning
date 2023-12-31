import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CareerSubcategorySkill extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public career_subcategory_id: number
  @column()
  public level: number
  @column()
  public skillname: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
