import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'client_career_stages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').unsigned().references('clients.id').onDelete('CASCADE')
      table.enum('stages',[
        'mencari promosi',
        'saat ini menganggur',
        'memulai karir',
        'ingin mengubah karir',
        'baru saja dipromosikan',
        'masuk kembali ke tempat kerja',
        'saat ini di universitas',
        'peningkatan keterampilan dalam pekerjaan saat ini',
      ])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
