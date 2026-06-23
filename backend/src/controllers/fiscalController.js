const { query } = require('../config/database');
class FiscalController {
  static async getAll(req, res, next) {
    try {
      const result = await query(
        `SELECT fp.*, fy.year AS fiscal_year FROM fiscal_periods fp JOIN fiscal_years fy ON fp.fiscal_year_id = fy.id ORDER BY fp.start_date`
      );
      res.json({ success: true, data: result.rows });
    } catch (err) { next(err); }
  }
  static async close(req, res, next) {
    try {
      const result = await query(
        `UPDATE fiscal_periods SET status = 'closed' WHERE id = $1 AND status = 'open' RETURNING *`, [req.params.id]
      );
      if (!result.rows.length) return res.status(400).json({ success: false, error: { message: 'Period not found or already closed' } });
      res.json({ success: true, data: result.rows[0] });
    } catch (err) { next(err); }
  }
}
module.exports = FiscalController;
