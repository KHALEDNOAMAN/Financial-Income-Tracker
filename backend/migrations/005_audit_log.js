exports.up = function(knex) {
  return knex.schema.createTable('audit_log', (t) => {
    t.increments('id').primary();
    t.string('table_name', 100).notNullable();
    t.integer('record_id').notNullable();
    t.string('action', 20).notNullable().checkIn(['INSERT', 'UPDATE', 'DELETE']);
    t.jsonb('old_values');
    t.jsonb('new_values');
    t.integer('changed_by').notNullable();
    t.timestamp('changed_at').defaultTo(knex.fn.now());
    t.string('ip_address', 45);
  }).then(() => knex.raw('CREATE INDEX idx_audit_log_table ON audit_log(table_name, record_id)'));
};
exports.down = function(knex) {
  return knex.schema.dropTable('audit_log');
};
