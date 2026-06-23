import React from 'react';
export default function IncomeList() {
  const records = [
    { id: 1, number: 'INC-2026-001', category: 'Tuition Fees', payer: 'Batch A Students', amount: 45000, date: '2026-06-20', method: 'Bank Transfer', status: 'confirmed' },
    { id: 2, number: 'INC-2026-002', category: 'Corporate Training', payer: 'TechCorp Ltd', amount: 120000, date: '2026-06-18', method: 'Bank Transfer', status: 'confirmed' },
    { id: 3, number: 'INC-2026-003', category: 'Subscriptions', payer: 'Platform Users', amount: 28400, date: '2026-06-15', method: 'Online', status: 'confirmed' },
    { id: 4, number: 'INC-2026-004', category: 'Course Sales', payer: 'Various', amount: 8750, date: '2026-06-14', method: 'Credit Card', status: 'pending' },
    { id: 5, number: 'INC-2026-005', category: 'Workshop Fees', payer: 'UI/UX Participants', amount: 12500, date: '2026-06-12', method: 'Online', status: 'confirmed' },
  ];
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>ðŸ“‹ Income Records</h1>
          <p style={{ color: '#64748b' }}>Manage and track all income entries</p>
        </div>
        <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>+ New Income</button>
      </div>
      <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: '#f8fafc' }}>
            {['Income #', 'Category', 'Payer', 'Amount', 'Date', 'Method', 'Status'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: 12, fontSize: 13, color: '#64748b', fontWeight: 600 }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{records.map(r => (
            <tr key={r.id} style={{ borderTop: '1px solid #f1f5f9' }}>
              <td style={{ padding: 12, fontSize: 13, fontFamily: 'monospace' }}>{r.number}</td>
              <td style={{ padding: 12, fontSize: 13 }}>{r.category}</td>
              <td style={{ padding: 12, fontSize: 13 }}>{r.payer}</td>
              <td style={{ padding: 12, fontSize: 14, fontWeight: 600 }}>â‚º{r.amount.toLocaleString()}</td>
              <td style={{ padding: 12, fontSize: 13, color: '#64748b' }}>{r.date}</td>
              <td style={{ padding: 12, fontSize: 13 }}>{r.method}</td>
              <td style={{ padding: 12 }}><span style={{ background: r.status === 'confirmed' ? '#f0fdf4' : '#fffbeb', color: r.status === 'confirmed' ? '#16a34a' : '#d97706', padding: '2px 8px', borderRadius: 12, fontSize: 12 }}>{r.status}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
