<div align="center">

# 💰 Financial Income Tracker

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

## ✨ Features

- 📒 **Double-Entry Bookkeeping** - Every transaction creates balanced debit/credit entries with PostgreSQL trigger validation
- 📆 **Fiscal Period Management** - Fiscal years and monthly periods with open/closed/locked states
- 💳 **7 Income Categories** - Tuition, Course Sales, Subscriptions, Corporate Training, Workshops, Merchandise, Other
- 🔄 **Recurring Income** - Automatic handling of subscription-based recurring revenue
- 📊 **Analytics Dashboard** - Summary cards, 12-month trend charts, category breakdowns with Chart.js
- 🔍 **Audit Trail** - JSONB-based audit log tracking all changes with old/new values
- 💱 **Monetary Precision** - DECIMAL(15,2) in PostgreSQL + integer arithmetic in JS (no floating-point errors)
- 📈 **Financial Reports** - Income by period, category breakdown, trend analysis

## 🏗️ Architecture

```
┌───────────────┐     ┌──────────────────┐     ┌──────────────┐
│ React Frontend│────▶│ Express.js API   │────▶│ PostgreSQL   │
│ (Chart.js)    │     │ (Double-Entry)   │     │ (5 tables)   │
└───────────────┘     └──────────────────┘     └──────────────┘
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/income` | List income (filter by category, period, date range) |
| POST | `/api/income` | Record new income |
| GET | `/api/income/summary` | Category totals & trends |
| GET | `/api/categories` | Income categories |
| GET | `/api/fiscal-periods` | Fiscal years & months |
| POST | `/api/fiscal-periods` | Create fiscal period |
| GET | `/api/reports/trend` | 12-month trend data |
| GET | `/api/reports/category-breakdown` | Revenue by category |

## 🚀 Getting Started

```bash
git clone https://github.com/KHALEDNOAMAN/Financial-Income-Tracker.git
cd Financial-Income-Tracker/backend
npm install && cp .env.example .env
npx knex migrate:latest && npx knex seed:run
npm run dev
```

## 📝 License
MIT License - see [LICENSE](LICENSE) file.

---
<div align="center">Built with ❤️ during internship at EduTech Yazilim A.S. - Istanbul, Turkey</div>
