import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, BelongsTo, HasMany, HasOne, beforeSave, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import ClientGoal from './ClientGoal'
import ClientLearningSubcategory from './ClientLearningSubcategory'
import ClientLearningCategory from './ClientLearningCategory'
import ClientCareerStage from './ClientCareerStage'
import ClientCareerCategory from './ClientCareerCategory'
import Agreement from './Agreement'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public frontname: string
  @column()
  public midname: string
  @column()
  public backname: string
  @column()
  public fullname: string
  @column()
  public username: string
  @column()
  public email: string
  @column()
  public password: string
  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (cs: Client) {
    if (cs.$dirty.password) {
      cs.password = await Hash.make(cs.password)
    }
  }

  // relationship

  @hasOne(() => ClientGoal, {
    localKey: 'id',
    foreignKey: 'client_id',
  })
  public goal: HasOne<typeof ClientGoal>

  @hasMany(() => ClientLearningCategory, {
    localKey: 'id',
    foreignKey: 'client_id'
  })
  public learning_category: HasMany<typeof ClientLearningCategory>

  @hasMany(() => ClientLearningSubcategory, {
    localKey: 'id',
    foreignKey: 'client_id'
  })
  public learning_subcategory: HasMany<typeof ClientLearningSubcategory>

  @hasOne(() => ClientCareerStage, {
    localKey: 'id',
    foreignKey: 'client_id',
  })
  public stages: HasOne<typeof ClientCareerStage>

  @hasMany(() => ClientCareerCategory, {
    localKey: 'id',
    foreignKey: 'client_id'
  })
  public career_category: HasMany<typeof ClientCareerCategory>
}
