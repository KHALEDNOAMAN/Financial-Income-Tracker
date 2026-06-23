const { query } = require('../config/database');
const AppError = require('../utils/AppError');

class IncomeController {
  static async getAll(req, res, next) {
    try {
      const { page = 1, limit = 20, category, startDate, endDate, status } = req.query;
      const offset = (page - 1) * limit;
      const conditions = ['1=1'];
      const params = [];
      let idx = 1;

      if (category) { conditions.push(`ir.category_id = $${idx++}`); params.push(category); }
      if (startDate) { conditions.push(`ir.income_date >= $${idx++}`); params.push(startDate); }
      if (endDate) { conditions.push(`ir.income_date <= $${idx++}`); params.push(endDate); }
      if (status) { conditions.push(`ir.status = $${idx++}`); params.push(status); }

      const where = conditions.join(' AND ');
      const countRes = await query(`SELECT COUNT(*) FROM income_records ir WHERE ${where}`, params);
      const total = parseInt(countRes.rows[0].count);

      const result = await query(
        `SELECT ir.*, ic.name AS category_name, ic.code AS category_code
         FROM income_records ir
         LEFT JOIN income_categories ic ON ir.category_id = ic.id
         WHERE ${where} ORDER BY ir.income_date DESC LIMIT $${idx++} OFFSET $${idx++}`,
        [...params, limit, offset]
      );

      res.json({ success: true, data: result.rows, meta: { page: +page, limit: +limit, total, totalPages: Math.ceil(total / limit) } });
    } catch (err) { next(err); }
  }

  static async getById(req, res, next) {
    try {
      const result = await query(
        `SELECT ir.*, ic.name AS category_name FROM income_records ir
         LEFT JOIN income_categories ic ON ir.category_id = ic.id WHERE ir.id = $1`, [req.params.id]
      );
      if (!result.rows.length) throw new AppError('Income record not found', 404);
      res.json({ success: true, data: result.rows[0] });
    } catch (err) { next(err); }
  }

  static async create(req, res, next) {
    try {
      const { categoryId, amount, incomeDate, description, payerName, payerType, paymentMethod, referenceNumber, isRecurring, recurrencePattern, notes } = req.body;
      if (!amount || amount <= 0) throw new AppError('Amount must be positive', 400);

      const periodRes = await query(
        `SELECT id, status FROM fiscal_periods WHERE $1 BETWEEN start_date AND end_date`, [incomeDate]
      );
      if (!periodRes.rows.length) throw new AppError('No fiscal period found for this date', 400);
      if (periodRes.rows[0].status !== 'open') throw new AppError('Fiscal period is closed', 400);

      const incomeNumber = `INC-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      const result = await query(
        `INSERT INTO income_records (income_number, category_id, amount, currency, income_date, fiscal_period_id, description, payer_name, payer_type, payment_method, reference_number, is_recurring, recurrence_pattern, notes, status, created_by)
         VALUES ($1,$2,$3,'TRY',$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'confirmed',$14) RETURNING *`,
        [incomeNumber, categoryId, amount, incomeDate, periodRes.rows[0].id, description, payerName, payerType, paymentMethod, referenceNumber, isRecurring || false, recurrencePattern, notes, req.user?.id || 1]
      );

      // Create double-entry transaction
      const txnNumber = `TXN-${Date.now()}`;
      const txnRes = await query(
        `INSERT INTO transactions (transaction_number, transaction_date, fiscal_period_id, description, total_amount, status, created_by)
         VALUES ($1, $2, $3, $4, $5, 'posted', $6) RETURNING id`,
        [txnNumber, incomeDate, periodRes.rows[0].id, `Income: ${description}`, amount, req.user?.id || 1]
      );

      // Debit Cash (1000), Credit Revenue account
      const catRes = await query('SELECT account_id FROM income_categories WHERE id = $1', [categoryId]);
      await query(
        `INSERT INTO transaction_lines (transaction_id, account_id, debit_amount, credit_amount) VALUES ($1, 1, $2, 0), ($1, $3, 0, $2)`,
        [txnRes.rows[0].id, amount, catRes.rows[0]?.account_id || 2]
      );

      await query('UPDATE income_records SET transaction_id = $1 WHERE id = $2', [txnRes.rows[0].id, result.rows[0].id]);

      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) { next(err); }
  }

  static async update(req, res, next) {
    try {
      const { description, payerName, notes, status } = req.body;
      const result = await query(
        `UPDATE income_records SET description = COALESCE($1, description), payer_name = COALESCE($2, payer_name), notes = COALESCE($3, notes), status = COALESCE($4, status), updated_at = NOW() WHERE id = $5 RETURNING *`,
        [description, payerName, notes, status, req.params.id]
      );
      if (!result.rows.length) throw new AppError('Income record not found', 404);
      res.json({ success: true, data: result.rows[0] });
    } catch (err) { next(err); }
  }
}
module.exports = IncomeController;
