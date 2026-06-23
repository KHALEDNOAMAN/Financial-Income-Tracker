const { query } = require('../config/database');
class IncomeService {
  static async getRecurringDue() {
    const result = await query(
      `SELECT * FROM income_records WHERE is_recurring = true AND status = 'confirmed'
       AND recurrence_end_date IS NULL OR recurrence_end_date >= CURRENT_DATE`
    );
    return result.rows;
  }
}
module.exports = IncomeService;
