exports.up = function(knex) {
  return knex.schema
    .createTable('income_categories', (t) => {
      t.increments('id').primary();
      t.string('code', 20).unique().notNullable();
      t.string('name', 200).notNullable();
      t.text('description');
      t.integer('account_id').references('id').inTable('chart_of_accounts');
      t.boolean('is_active').defaultTo(true);
      t.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('income_records', (t) => {
      t.increments('id').primary();
      t.string('income_number', 50).unique().notNullable();
      t.integer('category_id').notNullable().references('id').inTable('income_categories');
      t.decimal('amount', 15, 2).notNullable();
      t.string('currency', 3).defaultTo('TRY');
      t.date('income_date').notNullable();
      t.integer('fiscal_period_id').notNullable().references('id').inTable('fiscal_periods');
      t.text('description').notNullable();
      t.string('payer_name', 200);
      t.string('payer_type', 50).checkIn(['student', 'corporate', 'individual', 'other']);
      t.string('payment_method', 50).checkIn(['cash', 'bank_transfer', 'credit_card', 'online', 'check']);
      t.string('reference_number', 100);
      t.integer('transaction_id').references('id').inTable('transactions');
      t.boolean('is_recurring').defaultTo(false);
      t.string('recurrence_pattern', 50);
      t.date('recurrence_end_date');
      t.string('status', 20).defaultTo('confirmed').checkIn(['pending', 'confirmed', 'cancelled']);
      t.text('notes');
      t.integer('created_by').notNullable();
      t.timestamps(true, true);
    });
};
exports.down = function(knex) {
  return knex.schema.dropTable('income_records').dropTable('income_categories');
};
