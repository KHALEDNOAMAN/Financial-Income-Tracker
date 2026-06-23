import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import IncomeList from './components/IncomeList';
import IncomeForm from './components/IncomeForm';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/finance/dashboard" />} />
          <Route path="/finance/dashboard" element={<Dashboard />} />
          <Route path="/finance/income" element={<IncomeList />} />
          <Route path="/finance/income/new" element={<IncomeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
