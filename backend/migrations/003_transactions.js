exports.up = function(knex) {
  return knex.schema
    .createTable('transactions', (t) => {
      t.increments('id').primary();
      t.string('transaction_number', 50).unique().notNullable();
      t.date('transaction_date').notNullable();
      t.integer('fiscal_period_id').notNullable().references('id').inTable('fiscal_periods');
      t.text('description').notNullable();
      t.decimal('total_amount', 15, 2).notNullable();
      t.string('status', 20).defaultTo('posted').checkIn(['draft', 'posted', 'reversed']);
      t.integer('created_by').notNullable();
      t.timestamps(true, true);
    })
    .createTable('transaction_lines', (t) => {
      t.increments('id').primary();
      t.integer('transaction_id').notNullable().references('id').inTable('transactions').onDelete('CASCADE');
      t.integer('account_id').notNullable().references('id').inTable('chart_of_accounts');
      t.decimal('debit_amount', 15, 2).defaultTo(0);
      t.decimal('credit_amount', 15, 2).defaultTo(0);
      t.text('description');
      t.timestamp('created_at').defaultTo(knex.fn.now());
    });
};
exports.down = function(knex) {
  return knex.schema.dropTable('transaction_lines').dropTable('transactions');
};
