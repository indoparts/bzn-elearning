import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import LearningCategory from './LearningCategory'
import LearningMaterialContent from './LearningMaterialContent'
import LearningMaterialTag from './LearningMaterialTag'

export default class LearningMaterial extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public learning_subcategory_id: number
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
    localKey: 'id',
  })
  public createdby: BelongsTo<typeof User>
  @belongsTo(() => LearningCategory, {
    foreignKey: 'learning_subcategory_id',
    localKey: 'id',
  })
  public subcategory: BelongsTo<typeof LearningCategory>
  @hasMany(() => LearningMaterialContent, {
    localKey: 'id',
    foreignKey: 'learning_material_id'
  })
  public content: HasMany<typeof LearningMaterialContent>
  @hasMany(() => LearningMaterialTag, {
    localKey: 'id',
    foreignKey: 'learning_material_id'
  })
  public tag: HasMany<typeof LearningMaterialTag>
}
