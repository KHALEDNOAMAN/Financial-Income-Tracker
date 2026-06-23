exports.up = function(knex) {
  return knex.schema
    .raw(`CREATE TYPE account_category AS ENUM ('asset', 'liability', 'equity', 'revenue', 'expense')`)
    .createTable('chart_of_accounts', (t) => {
      t.increments('id').primary();
      t.string('account_code', 20).unique().notNullable();
      t.string('account_name', 200).notNullable();
      t.specificType('category', 'account_category').notNullable();
      t.integer('parent_account_id').references('id').inTable('chart_of_accounts');
      t.text('description');
      t.boolean('is_active').defaultTo(true);
      t.string('normal_balance', 10).notNullable().checkIn(['debit', 'credit']);
      t.timestamps(true, true);
    });
};
exports.down = function(knex) {
  return knex.schema.dropTable('chart_of_accounts').raw('DROP TYPE IF EXISTS account_category');
};
