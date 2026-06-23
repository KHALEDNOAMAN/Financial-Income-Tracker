exports.seed = async function(knex) {
  await knex('chart_of_accounts').del();
  await knex('chart_of_accounts').insert([
    { id: 1, account_code: '1000', account_name: 'Cash and Cash Equivalents', category: 'asset', normal_balance: 'debit' },
    { id: 2, account_code: '1100', account_name: 'Bank Accounts', category: 'asset', normal_balance: 'debit' },
    { id: 3, account_code: '1200', account_name: 'Accounts Receivable', category: 'asset', normal_balance: 'debit' },
    { id: 4, account_code: '2000', account_name: 'Accounts Payable', category: 'liability', normal_balance: 'credit' },
    { id: 5, account_code: '3000', account_name: 'Owner Equity', category: 'equity', normal_balance: 'credit' },
    { id: 6, account_code: '4100', account_name: 'Tuition Fee Revenue', category: 'revenue', normal_balance: 'credit' },
    { id: 7, account_code: '4200', account_name: 'Course Sales Revenue', category: 'revenue', normal_balance: 'credit' },
    { id: 8, account_code: '4300', account_name: 'Subscription Revenue', category: 'revenue', normal_balance: 'credit' },
    { id: 9, account_code: '4400', account_name: 'Corporate Training Revenue', category: 'revenue', normal_balance: 'credit' },
    { id: 10, account_code: '4500', account_name: 'Workshop Revenue', category: 'revenue', normal_balance: 'credit' },
    { id: 11, account_code: '4600', account_name: 'Merchandise Revenue', category: 'revenue', normal_balance: 'credit' },
    { id: 12, account_code: '4900', account_name: 'Other Revenue', category: 'revenue', normal_balance: 'credit' },
    { id: 13, account_code: '5000', account_name: 'Salaries Expense', category: 'expense', normal_balance: 'debit' },
    { id: 14, account_code: '5100', account_name: 'Rent Expense', category: 'expense', normal_balance: 'debit' },
    { id: 15, account_code: '5200', account_name: 'Technology Expense', category: 'expense', normal_balance: 'debit' },
  ]);

  await knex('income_categories').del();
  await knex('income_categories').insert([
    { id: 1, code: 'INC-TUI', name: 'Tuition Fees', description: 'Semester/term-based tuition payments', account_id: 6 },
    { id: 2, code: 'INC-CRS', name: 'Course Sales', description: 'Individual course purchases', account_id: 7 },
    { id: 3, code: 'INC-SUB', name: 'Subscriptions', description: 'Monthly/annual platform subscriptions', account_id: 8 },
    { id: 4, code: 'INC-CRP', name: 'Corporate Training', description: 'B2B corporate training contracts', account_id: 9 },
    { id: 5, code: 'INC-WRK', name: 'Workshop Fees', description: 'Workshop and bootcamp fees', account_id: 10 },
    { id: 6, code: 'INC-MRC', name: 'Merchandise', description: 'Branded merchandise and materials', account_id: 11 },
    { id: 7, code: 'INC-OTH', name: 'Other Income', description: 'Miscellaneous income sources', account_id: 12 },
  ]);

  await knex('fiscal_years').del();
  await knex('fiscal_years').insert([{ id: 1, year: 2026, start_date: '2026-01-01', end_date: '2026-12-31', status: 'open' }]);

  await knex('fiscal_periods').del();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const periods = months.map((name, i) => ({
    fiscal_year_id: 1, period_number: i + 1, period_name: name,
    start_date: `2026-${String(i+1).padStart(2,'0')}-01`,
    end_date: new Date(2026, i + 1, 0).toISOString().split('T')[0],
    status: i < 5 ? 'open' : 'open',
  }));
  await knex('fiscal_periods').insert(periods);
};
