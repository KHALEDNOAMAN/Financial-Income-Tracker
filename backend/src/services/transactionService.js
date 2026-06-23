const { query } = require('../config/database');
class TransactionService {
  static async createDoubleEntry(date, periodId, description, amount, debitAccountId, creditAccountId, createdBy) {
    const client = await require('../config/database').pool.connect();
    try {
      await client.query('BEGIN');
      const txnNumber = `TXN-${Date.now()}`;
      const txn = await client.query(
        `INSERT INTO transactions (transaction_number, transaction_date, fiscal_period_id, description, total_amount, status, created_by)
         VALUES ($1,$2,$3,$4,$5,'posted',$6) RETURNING id`,
        [txnNumber, date, periodId, description, amount, createdBy]
      );
      const txnId = txn.rows[0].id;
      await client.query(
        `INSERT INTO transaction_lines (transaction_id, account_id, debit_amount, credit_amount) VALUES ($1,$2,$3,0), ($1,$4,0,$3)`,
        [txnId, debitAccountId, amount, creditAccountId]
      );
      await client.query('COMMIT');
      return txnId;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
}
module.exports = TransactionService;
