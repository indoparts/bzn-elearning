import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CareerSubcategorySalary extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public career_subcategory_id: number
  @column()
  public country_name: string
  @column()
  public country_flag_img: string
  @column()
  public country_currency: string
  @column()
  public country_amount_currency: number
  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public country_amount_currency_period: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
