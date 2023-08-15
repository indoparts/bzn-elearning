import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CareerMaterial from './CareerMaterial'
import CareerCategory from './CareerCategory'
import User from './User'
import CareerSubcategoryInfo from './CareerSubcategoryInfo'
import CareerSubcategorySalary from './CareerSubcategorySalary'
import CareerSubcategorySkill from './CareerSubcategorySkill'

export default class CareerSubcategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public career_category_id: number
  @column()
  public created_by: number
  @column()
  public icon: string
  @column()
  public cover_img: string
  @column()
  public name: string
  @column()
  public slug: string
  @column()
  public description: string
  @column()
  public meta_title: string
  @column()
  public meta_description: string
  @column()
  public meta_keyword: string
  @column()
  public alternate_name: string
  @column()
  public conclusion: string
  @column()
  public advise_from_wise: string
  @column()
  public did_you_know: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'created_by',
    localKey: 'id'
  })
  public createdby: BelongsTo<typeof User>
  @belongsTo(() => CareerCategory, {
    foreignKey: 'career_category_id',
    localKey: 'id',
  })
  public category: BelongsTo<typeof CareerCategory>
  @hasMany(() => CareerMaterial, {
    localKey: 'id',
    foreignKey: 'career_subcategory_id'
  })
  public subcategory: HasMany<typeof CareerMaterial>

  @hasMany(() => CareerSubcategoryInfo, {
    localKey: 'id',
    foreignKey: 'career_subcategory_id'
  })
  public info: HasMany<typeof CareerSubcategoryInfo>
  @hasMany(() => CareerSubcategorySalary, {
    localKey: 'id',
    foreignKey: 'career_subcategory_id'
  })
  public salary: HasMany<typeof CareerSubcategorySalary>
  @hasMany(() => CareerSubcategorySkill, {
    localKey: 'id',
    foreignKey: 'career_subcategory_id'
  })
  public skill: HasMany<typeof CareerSubcategorySkill>
}
