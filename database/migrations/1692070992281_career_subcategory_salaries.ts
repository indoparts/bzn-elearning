import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'career_subcategory_salaries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('career_subcategory_id').unsigned().references('career_subcategories.id').onDelete('CASCADE')
      table.string('country_name')
      table.string('country_flag_img')
      table.string('country_currency')
      table.string('country_amount_currency')
      table.date('country_amount_currency_period')
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
