exports.up = function(knex) {
  return knex.schema
    .createTable('fiscal_years', (t) => {
      t.increments('id').primary();
      t.integer('year').unique().notNullable();
      t.date('start_date').notNullable();
      t.date('end_date').notNullable();
      t.string('status', 20).defaultTo('open').checkIn(['open', 'closed']);
      t.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('fiscal_periods', (t) => {
      t.increments('id').primary();
      t.integer('fiscal_year_id').notNullable().references('id').inTable('fiscal_years');
      t.integer('period_number').notNullable();
      t.string('period_name', 50).notNullable();
      t.date('start_date').notNullable();
      t.date('end_date').notNullable();
      t.string('status', 20).defaultTo('open').checkIn(['open', 'closed', 'locked']);
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.unique(['fiscal_year_id', 'period_number']);
    });
};
exports.down = function(knex) {
  return knex.schema.dropTable('fiscal_periods').dropTable('fiscal_years');
};
