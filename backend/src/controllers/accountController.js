const { query } = require('../config/database');
class AccountController {
  static async getAll(req, res, next) {
    try {
      const result = await query('SELECT * FROM chart_of_accounts WHERE is_active = true ORDER BY account_code');
      res.json({ success: true, data: result.rows });
    } catch (err) { next(err); }
  }
  static async getById(req, res, next) {
    try {
      const result = await query('SELECT * FROM chart_of_accounts WHERE id = $1', [req.params.id]);
      if (!result.rows.length) return res.status(404).json({ success: false, error: { message: 'Account not found' } });
      res.json({ success: true, data: result.rows[0] });
    } catch (err) { next(err); }
  }
}
module.exports = AccountController;
