import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { AgreementFactory, UserFactory } from 'Database/factories/UserFactory'
import Client from 'App/Models/Client'
import AgreementDatumFactory from 'Database/factories/AgreementDatumFactory'

export default class extends BaseSeeder {
  public async run() {
    const user = new User()
    user.role_id = 1
    user.name = 'Superadmin'
    user.username = 'Superadmin'
    user.email = 'superadmin@test.tes'
    user.password = '123456'
    await user.save()

    const client = new Client()
    client.frontname = 'depan'
    client.midname = 'tengah'
    client.backname = 'belakang'
    client.fullname = 'depan tengah belakang'
    client.username = 'clienttest'
    client.email = 'client@test.tes'
    client.password = '123456',
      client.status = 'active'
    await client.save()

    await UserFactory
      .createMany(100)
    await AgreementDatumFactory
      .createMany(100)
    await AgreementFactory
      .with('clients', 1)
      .createMany(100)
  }
}
