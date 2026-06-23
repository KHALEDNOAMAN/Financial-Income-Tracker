import React from 'react';

const metrics = [
  { title: 'Total Income', value: 'â‚º847,250', change: '+12.5%', icon: 'ðŸ’°', color: '#22c55e' },
  { title: 'Subscription Revenue', value: 'â‚º284,500', change: '+8.2%', icon: 'ðŸ”„', color: '#3b82f6' },
  { title: 'One-time Sales', value: 'â‚º562,750', change: '+15.3%', icon: 'ðŸ’³', color: '#8b5cf6' },
  { title: 'YoY Growth', value: '23.4%', change: '+5.1%', icon: 'ðŸ“ˆ', color: '#f59e0b' },
];

const recentIncome = [
  { id: 1, description: 'Spring Semester Tuition - Batch A', category: 'Tuition', amount: 'â‚º45,000', date: '2026-06-20', status: 'confirmed' },
  { id: 2, description: 'Corporate Training - TechCorp', category: 'Corporate', amount: 'â‚º120,000', date: '2026-06-18', status: 'confirmed' },
  { id: 3, description: 'Monthly Platform Subscriptions', category: 'Subscription', amount: 'â‚º28,400', date: '2026-06-15', status: 'confirmed' },
  { id: 4, description: 'React Masterclass Course Sales', category: 'Course Sales', amount: 'â‚º8,750', date: '2026-06-14', status: 'pending' },
  { id: 5, description: 'Weekend Workshop - UI/UX Design', category: 'Workshop', amount: 'â‚º12,500', date: '2026-06-12', status: 'confirmed' },
];

export default function Dashboard() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>ðŸ’° Financial Dashboard</h1>
      <p style={{ color: '#64748b', marginBottom: 24 }}>Income overview and analytics</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 32 }}>
        {metrics.map(m => (
          <div key={m.title} style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>{m.icon}</span>
              <span style={{ color: '#22c55e', fontSize: 13, fontWeight: 600 }}>{m.change}</span>
            </div>
            <p style={{ color: '#64748b', fontSize: 13 }}>{m.title}</p>
            <p style={{ fontSize: 24, fontWeight: 700 }}>{m.value}</p>
          </div>
        ))}
      </div>
      <div style={{ background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>ðŸ“‹ Recent Income Records</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: 12, fontSize: 13, color: '#64748b' }}>Description</th>
              <th style={{ textAlign: 'left', padding: 12, fontSize: 13, color: '#64748b' }}>Category</th>
              <th style={{ textAlign: 'right', padding: 12, fontSize: 13, color: '#64748b' }}>Amount</th>
              <th style={{ textAlign: 'left', padding: 12, fontSize: 13, color: '#64748b' }}>Date</th>
              <th style={{ textAlign: 'center', padding: 12, fontSize: 13, color: '#64748b' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentIncome.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: 12, fontSize: 14 }}>{r.description}</td>
                <td style={{ padding: 12, fontSize: 13 }}><span style={{ background: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: 12, fontSize: 12 }}>{r.category}</span></td>
                <td style={{ padding: 12, fontSize: 14, fontWeight: 600, textAlign: 'right' }}>{r.amount}</td>
                <td style={{ padding: 12, fontSize: 13, color: '#64748b' }}>{r.date}</td>
                <td style={{ padding: 12, textAlign: 'center' }}><span style={{ background: r.status === 'confirmed' ? '#f0fdf4' : '#fffbeb', color: r.status === 'confirmed' ? '#16a34a' : '#d97706', padding: '2px 8px', borderRadius: 12, fontSize: 12 }}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
