const { query } = require('../config/database');
class ReportController {
  static async incomeSummary(req, res, next) {
    try {
      const [totalIncome, subscriptionRevenue, oneTimeSales, monthlyTrend] = await Promise.all([
        query(`SELECT COALESCE(SUM(amount), 0) AS total FROM income_records WHERE status = 'confirmed' AND income_date >= date_trunc('month', CURRENT_DATE)`),
        query(`SELECT COALESCE(SUM(amount), 0) AS total FROM income_records ir JOIN income_categories ic ON ir.category_id = ic.id WHERE ic.code = 'INC-SUB' AND ir.status = 'confirmed' AND ir.income_date >= date_trunc('month', CURRENT_DATE)`),
        query(`SELECT COALESCE(SUM(amount), 0) AS total FROM income_records WHERE is_recurring = false AND status = 'confirmed' AND income_date >= date_trunc('month', CURRENT_DATE)`),
        query(`SELECT date_trunc('month', income_date) AS month, SUM(amount) AS total FROM income_records WHERE status = 'confirmed' AND income_date >= CURRENT_DATE - INTERVAL '12 months' GROUP BY month ORDER BY month`),
      ]);
      res.json({
        success: true,
        data: {
          totalIncome: parseFloat(totalIncome.rows[0].total),
          subscriptionRevenue: parseFloat(subscriptionRevenue.rows[0].total),
          oneTimeSales: parseFloat(oneTimeSales.rows[0].total),
          monthlyTrend: monthlyTrend.rows,
        },
      });
    } catch (err) { next(err); }
  }

  static async byCategory(req, res, next) {
    try {
      const result = await query(
        `SELECT ic.name, ic.code, COUNT(ir.id) AS count, COALESCE(SUM(ir.amount), 0) AS total
         FROM income_categories ic LEFT JOIN income_records ir ON ic.id = ir.category_id AND ir.status = 'confirmed'
         GROUP BY ic.id, ic.name, ic.code ORDER BY total DESC`
      );
      res.json({ success: true, data: result.rows });
    } catch (err) { next(err); }
  }

  static async monthlyTrend(req, res, next) {
    try {
      const result = await query(
        `SELECT to_char(income_date, 'YYYY-MM') AS month, SUM(amount) AS total, COUNT(*) AS count
         FROM income_records WHERE status = 'confirmed' AND income_date >= CURRENT_DATE - INTERVAL '12 months'
         GROUP BY month ORDER BY month`
      );
      res.json({ success: true, data: result.rows });
    } catch (err) { next(err); }
  }
}
module.exports = ReportController;
