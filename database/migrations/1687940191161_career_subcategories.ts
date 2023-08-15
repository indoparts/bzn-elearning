import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'career_subcategories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('career_category_id').unsigned().references('career_categories.id').onDelete('CASCADE')
      table.integer('created_by').unsigned().references('users.id').onDelete('CASCADE')
      table.string('icon')
      table.string('cover_img')
      table.string('name')
      table.string('slug')
      table.text('description', 'longtext')
      table.string('meta_title')
      table.text('meta_description', 'longtext')
      table.text('meta_keyword', 'longtext')
      table.string('alternate_name')
      table.text('conclusion', 'longtext')
      table.text('advise_from_wise', 'longtext')
      table.text('did_you_know', 'longtext')
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
