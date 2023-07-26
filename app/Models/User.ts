import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, BelongsTo, HasMany, beforeSave, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import LearningCategory from './LearningCategory'
import LearningSubcategory from './LearningSubcategory'
import LearningMaterial from './LearningMaterial'
import LearningMaterialContent from './LearningMaterialContent'
import LearningMaterialTag from './LearningMaterialTag'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public role_id: number
  @column()
  public name: string
  @column()
  public username: string
  @column()
  public email: string
  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @belongsTo(() => Role, {
    foreignKey: 'role_id',
  })
  public roles: BelongsTo<typeof Role>
  @hasMany(() => LearningCategory, {
    localKey: 'id',
    foreignKey: 'createdby'
  })
  public LC: HasMany<typeof LearningCategory>
  @hasMany(() => LearningSubcategory, {
    localKey: 'id',
    foreignKey: 'createdby'
  })
  public LSC: HasMany<typeof LearningSubcategory>
  @hasMany(() => LearningMaterial, {
    localKey: 'id',
    foreignKey: 'createdby'
  })
  public LM: HasMany<typeof LearningMaterial>
  @hasMany(() => LearningMaterialContent, {
    localKey: 'id',
    foreignKey: 'createdby'
  })
  public LMC: HasMany<typeof LearningMaterialContent>
  @hasMany(() => LearningMaterialTag, {
    localKey: 'id',
    foreignKey: 'createdby'
  })
  public LMT: HasMany<typeof LearningMaterialTag>
}
