<div align="center">

# ðŸ’° Financial Income Tracker

**Double-Entry Bookkeeping System with Fiscal Period Management & Analytics**

[![Node.js](https://img.shields.io/badge/Node.js-20_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)](https://www.chartjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A comprehensive financial income tracking system implementing double-entry bookkeeping principles with fiscal period management, 7 income categories, recurring income support, audit logging, and interactive analytics dashboard.

</div>

---

## âœ¨ Features

- ðŸ“’ **Double-Entry Bookkeeping** - Every transaction creates balanced debit/credit entries with PostgreSQL trigger validation
- ðŸ“… **Fiscal Period Management** - Fiscal years and monthly periods with open/closed/locked states
- ðŸ’³ **7 Income Categories** - Tuition, Course Sales, Subscriptions, Corporate Training, Workshops, Merchandise, Other
- ðŸ”„ **Recurring Income** - Automatic handling of subscription-based recurring revenue
- ðŸ“Š **Analytics Dashboard** - Summary cards, 12-month trend charts, category breakdowns with Chart.js
- ðŸ” **Audit Trail** - JSONB-based audit log tracking all changes with old/new values
- ðŸ’± **Monetary Precision** - DECIMAL(15,2) in PostgreSQL + integer arithmetic in JS (no floating-point errors)
- ðŸ“‘ **Financial Reports** - Income by period, category breakdown, trend analysis

## ðŸ—ï¸ Architecture

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚   React Frontendâ”‚â”€â”€â”€â”€â–¶â”‚  Express.js API  â”‚â”€â”€â”€â”€â–¶â”‚  PostgreSQL DB  â”‚
â”‚   (Chart.js)    â”‚     â”‚  (REST + JWT)    â”‚     â”‚  (Double-Entry) â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## ðŸ“ Project Structure

```
Financial-Income-Tracker/
â”œâ”€â”€ backend/
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ app.js                     # Express setup
â”‚   â”‚   â”œâ”€â”€ config/database.js         # PostgreSQL pool
â”‚   â”‚   â”œâ”€â”€ controllers/               # Request handlers
â”‚   â”‚   â”œâ”€â”€ middleware/                 # Auth, error handling
â”‚   â”‚   â”œâ”€â”€ routes/                    # API routes
â”‚   â”‚   â”œâ”€â”€ services/                  # Business logic
â”‚   â”‚   â”œâ”€â”€ utils/moneyUtils.js        # Safe money operations
â”‚   â”‚   â””â”€â”€ validators/                # Zod schemas
â”‚   â”œâ”€â”€ migrations/                    # Database schema
â”‚   â”œâ”€â”€ seeds/                         # Sample data
â”‚   â”œâ”€â”€ server.js
â”‚   â””â”€â”€ package.json
â”œâ”€â”€ frontend/
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ App.jsx
â”‚   â”‚   â”œâ”€â”€ components/                # Dashboard, forms, charts
â”‚   â”‚   â””â”€â”€ services/api.js
â”‚   â””â”€â”€ package.json
â””â”€â”€ README.md
```

## ðŸ—„ï¸ Database Schema

```
chart_of_accounts â”€â”€â”
                    â”œâ”€â”€â–¶ transaction_lines â”€â”€â–¶ transactions â”€â”€â–¶ fiscal_periods â”€â”€â–¶ fiscal_years
income_categories â”€â”€â”˜                              â–²
       â”‚                                           â”‚
       â””â”€â”€â–¶ income_records â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                                   
audit_log (tracks all changes with JSONB snapshots)
```

## ðŸ› ï¸ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js 20 | Runtime |
| Express.js 4 | API Framework |
| PostgreSQL 15 | Database with DECIMAL precision |
| Knex.js | Migrations & query builder |
| React 18 | Frontend UI |
| Chart.js 4 | Data visualization |
| JWT | Authentication |
| Zod | Input validation |

## ðŸš€ Getting Started

```bash
git clone https://github.com/KHALEDNOAMAN/Financial-Income-Tracker.git
cd Financial-Income-Tracker/backend
npm install
cp .env.example .env
npx knex migrate:latest
npx knex seed:run
npm run dev
```

## ðŸ“¡ API Endpoints

### Income
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/income` | List income records (paginated, filterable) |
| GET | `/api/income/:id` | Get income record details |
| POST | `/api/income` | Record new income |
| PUT | `/api/income/:id` | Update income record |

### Accounts & Periods
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/accounts` | List chart of accounts |
| GET | `/api/fiscal-periods` | List fiscal periods |
| POST | `/api/fiscal-periods/:id/close` | Close a fiscal period |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/income-summary` | Income summary with totals |
| GET | `/api/reports/by-category` | Income breakdown by category |
| GET | `/api/reports/monthly-trend` | 12-month income trend |

## ðŸ“ License

MIT License - see [LICENSE](LICENSE) file.

---

<div align="center">
  Built with â¤ï¸ during internship at EduTech Yazilim A.S. - Istanbul, Turkey
</div>
