const { query } = require('../config/database');
class ReportService {
  static async getIncomeSummary(startDate, endDate) {
    const result = await query(
      `SELECT ic.name AS category, SUM(ir.amount) AS total, COUNT(*) AS count
       FROM income_records ir JOIN income_categories ic ON ir.category_id = ic.id
       WHERE ir.status = 'confirmed' AND ir.income_date BETWEEN $1 AND $2
       GROUP BY ic.name ORDER BY total DESC`,
      [startDate, endDate]
    );
    return result.rows;
  }
}
module.exports = ReportService;
