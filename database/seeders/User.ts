import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
// import { LearningCategoryFactory, LearningMaterialContentFactory, LearningMaterialFactory, LearningMaterialTagsFactory, LearningSubategoryFactory } from 'Database/factories/LearningFactory'
// import { CareerCategoryFactory, CareerMaterialContentFactory, CareerMaterialFactory, CareerMaterialTagsFactory, CareerSubategoryFactory } from 'Database/factories/CareerFactory'
import { AgreementFactory, UserFactory } from 'Database/factories/UserFactory'
import Client from 'App/Models/Client'
import AgreementDatumFactory from 'Database/factories/AgreementDatumFactory'
import CareerCategory from 'App/Models/CareerCategory'

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
    const cCareerData : any[]=[]
    const cCareer=[
      'Pertanian, Pangan, dan Sumber Daya Alam',
      'Ilmu Kesehatan',
      'Keuangan',
      'Information Technology',
      'Education and Training',
      'Manajemen dan Administrasi Bisnis',
      'Pemasaran, Penjualan, dan Layanan',
      'Perhotelan dan Pariwisata',
      'Science, Technology, Engineering, and Mathematics',
      'Arsitektur dan Konstruksi',
      'Pemerintahan dan Administrasi Publik',
      'Hukum, Keamanan Publik, Pemasyarakatan, dan Keamanan',
      'Manufaktur',
      'Transportasi, Distribusi, dan Logistik',
      'Layanan Manusia',
      'Seni, Teknologi Audio/Video, dan Komunikasi'
    ];
    cCareer.forEach(e => {
      cCareerData.push({
        name:e,
        icon:'example.png',
        created_by:1
      })
    });

    await CareerCategory.createMany(cCareerData);
    

    // await CareerMaterialContentFactory
    //   .with('career_material', 10)
    //   .createMany(200)
    // await CareerMaterialTagsFactory
    //   .with('career_material', 10)
    //   .createMany(200)
    // await CareerMaterialFactory
    //   .with('subcategory', 10)
    //   .createMany(200)
    // await CareerSubategoryFactory
    //   .with('category', 10)
    //   .createMany(200)
    // await CareerCategoryFactory.createMany(200)

    // await LearningMaterialContentFactory
    //   .with('learning_material', 10)
    //   .createMany(200)
    // await LearningMaterialTagsFactory
    //   .with('learning_material', 10)
    //   .createMany(200)
    // await LearningMaterialFactory
    //   .with('subcategory', 10)
    //   .createMany(200)
    // await LearningSubategoryFactory
    //   .with('category', 10)
    //   .createMany(200)
    // await LearningCategoryFactory.createMany(200)
  }
}
