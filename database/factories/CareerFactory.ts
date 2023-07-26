import Factory from '@ioc:Adonis/Lucid/Factory'
import CareerCategory from 'App/Models/CareerCategory'
import CareerSubcategory from 'App/Models/CareerSubcategory'
import CareerMaterial from 'App/Models/CareerMaterial'
import CareerMaterialContent from 'App/Models/CareerMaterialContent'
import CareerMaterialTag from 'App/Models/CareerMaterialTag'
export const CareerMaterialContentFactory = Factory
  .define(CareerMaterialContent, ({ faker }) => {
    return {
      created_by: 1,
      page: 1,
      title_page: faker.lorem.sentence(),
      content_page: faker.lorem.paragraphs(),
      desc: faker.lorem.words(),
      slug: faker.lorem.slug()
    }
  })
  .relation('career_material', () => CareerMaterialFactory)
  .build()
export const CareerMaterialTagsFactory = Factory
  .define(CareerMaterialTag, ({ faker }) => {
    return {
      created_by: 1,
      tags: faker.string.sample(),
    }
  })
  .relation('career_material', () => CareerMaterialFactory)
  .build()

export const CareerMaterialFactory = Factory
  .define(CareerMaterial, ({ faker }) => {
    return {
      created_by: 1,
      title: faker.lorem.sentence()
    }
  })
  .relation('subcategory', () => CareerSubategoryFactory)
  .build()

export const CareerSubategoryFactory = Factory
  .define(CareerSubcategory, ({ faker }) => {
    return {
      created_by: 1,
      icon: faker.image.avatar(),
      name: faker.lorem.sentence()
    }
  })
  .relation('category', () => CareerCategoryFactory)
  .build()

export const CareerCategoryFactory = Factory
  .define(CareerCategory, ({ faker }) => {
    return {
      created_by: 1,
      icon: faker.image.avatar(),
      name: faker.lorem.sentence()
    }
  })
  .build()