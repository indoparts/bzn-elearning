import LearningCategory from 'App/Models/LearningCategory'
import Factory from '@ioc:Adonis/Lucid/Factory'
import LearningSubcategory from 'App/Models/LearningSubcategory'
import LearningMaterial from 'App/Models/LearningMaterial'
import LearningMaterialContent from 'App/Models/LearningMaterialContent'
import LearningMaterialTag from 'App/Models/LearningMaterialTag'

export const LearningMaterialContentFactory = Factory
  .define(LearningMaterialContent, ({ faker }) => {
    const page = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    return {
      created_by: 1,
      page: page[Math.floor(Math.random() * page.length)],
      title_page: faker.lorem.sentence(),
      content_page: faker.lorem.paragraphs(),
      desc: faker.lorem.words(),
      slug: faker.lorem.slug()
    }
  })
  .relation('learning_material', () => LearningMaterialFactory)
  .build()
  
export const LearningMaterialTagsFactory = Factory
  .define(LearningMaterialTag, ({ faker }) => {
    return {
      created_by: 1,
      tags: faker.string.sample(),
    }
  })
  .relation('learning_material', () => LearningMaterialFactory)
  .build()

export const LearningMaterialFactory = Factory
  .define(LearningMaterial, ({ faker }) => {
    return {
      created_by: 1,
      title: faker.lorem.sentence()
    }
  })
  .relation('subcategory', () => LearningSubategoryFactory)
  .build()

export const LearningSubategoryFactory = Factory
  .define(LearningSubcategory, ({ faker }) => {
    return {
      created_by: 1,
      icon: faker.image.avatar(),
      name: faker.lorem.sentence()
    }
  })
  .relation('category', () => LearningCategoryFactory)
  .build()

export const LearningCategoryFactory = Factory
  .define(LearningCategory, ({ faker }) => {
    return {
      created_by: 1,
      icon: faker.image.avatar(),
      name: faker.lorem.sentence()
    }
  })
  .build()
