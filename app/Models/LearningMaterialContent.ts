import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import LearningMaterial from './LearningMaterial'
import User from './User'

export default class LearningMaterialContent extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public learning_material_id: number
  @column()
  public created_by: number
  @column()
  public page: number
  @column()
  public title_page: string
  @column()
  public content_page: string
  @column()
  public desc: string
  @column()
  public slug: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // relationship
  @belongsTo(() => LearningMaterial, {
    foreignKey: 'learning_material_id',
    localKey: 'id'
  })
  public learning_material: BelongsTo<typeof LearningMaterial>
  @belongsTo(() => User, {
    foreignKey: 'created_by',
    localKey: 'id',
  })
  public createdby: BelongsTo<typeof User>
}
