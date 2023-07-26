import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import CareerCategory from './CareerCategory'
import CareerMaterialContent from './CareerMaterialContent'
import CareerMaterialTag from './CareerMaterialTag'

export default class CareerMaterial extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public career_subcategory_id: number
  @column()
  public created_by: number
  @column()
  public title: string

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
  @belongsTo(() => CareerCategory, {
    foreignKey: 'career_subcategory_id',
    localKey: 'id',
  })
  public subcategory: BelongsTo<typeof CareerCategory>
  @hasMany(() => CareerMaterialContent, {
    localKey: 'id',
    foreignKey: 'career_material_id'
  })
  public content: HasMany<typeof CareerMaterialContent>
  @hasMany(() => CareerMaterialTag, {
    localKey: 'id',
    foreignKey: 'career_material_id'
  })
  public tag: HasMany<typeof CareerMaterialTag>
}
