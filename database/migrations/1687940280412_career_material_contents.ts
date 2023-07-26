import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'career_material_contents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('career_material_id').unsigned().references('career_materials.id').onDelete('CASCADE')
      table.integer('created_by').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('page')
      table.string('title_page')
      table.text('content_page', 'longtext')
      table.text('desc', 'longtext')
      table.string('slug')
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
