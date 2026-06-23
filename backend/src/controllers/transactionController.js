const { query } = require('../config/database');
class TransactionController {
  static async getAll(req, res, next) {
    try {
      const result = await query(
        `SELECT t.*, json_agg(json_build_object('id', tl.id, 'account_id', tl.account_id, 'debit', tl.debit_amount, 'credit', tl.credit_amount, 'account_name', coa.account_name)) AS lines
         FROM transactions t
         LEFT JOIN transaction_lines tl ON t.id = tl.transaction_id
         LEFT JOIN chart_of_accounts coa ON tl.account_id = coa.id
         GROUP BY t.id ORDER BY t.transaction_date DESC LIMIT 50`
      );
      res.json({ success: true, data: result.rows });
    } catch (err) { next(err); }
  }
}
module.exports = TransactionController;
