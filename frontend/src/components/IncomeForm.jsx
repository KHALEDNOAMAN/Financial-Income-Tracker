import React, { useState } from 'react';
const categories = ['Tuition Fees', 'Course Sales', 'Subscriptions', 'Corporate Training', 'Workshop Fees', 'Merchandise', 'Other'];
const paymentMethods = ['Cash', 'Bank Transfer', 'Credit Card', 'Online', 'Check'];

export default function IncomeForm() {
  const [form, setForm] = useState({ category: '', amount: '', date: '', description: '', payer: '', method: '', recurring: false });
  const update = (field, value) => setForm({ ...form, [field]: value });
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>ðŸ’° Record New Income</h1>
      <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#374151' }}>Category *</label>
            <select value={form.category} onChange={e => update('category', e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }}>
              <option value="">Select category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#374151' }}>Amount (TRY) *</label>
            <input type="number" value={form.amount} onChange={e => update('amount', e.target.value)} placeholder="0.00" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#374151' }}>Income Date *</label>
            <input type="date" value={form.date} onChange={e => update('date', e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#374151' }}>Payment Method</label>
            <select value={form.method} onChange={e => update('method', e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }}>
              <option value="">Select method</option>
              {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#374151' }}>Description *</label>
            <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={3} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db', resize: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 4, color: '#374151' }}>Payer Name</label>
            <input type="text" value={form.payer} onChange={e => update('payer', e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: 24 }}>
            <input type="checkbox" checked={form.recurring} onChange={e => update('recurring', e.target.checked)} id="recurring" />
            <label htmlFor="recurring" style={{ marginLeft: 8, fontSize: 14 }}>This is a recurring income</label>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
          <button style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #d1d5db', background: 'white', cursor: 'pointer' }}>Cancel</button>
          <button style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#2563eb', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Save Income Record</button>
        </div>
      </div>
    </div>
  );
}
