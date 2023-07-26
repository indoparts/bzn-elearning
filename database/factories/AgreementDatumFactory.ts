import AgreementDatum from 'App/Models/AgreementDatum'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(AgreementDatum, ({ faker }) => {
  return {
    created_by: 1,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    status: 'inactive',
  }
}).build()
