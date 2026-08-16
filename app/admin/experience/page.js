'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import AdminHeader from '../../../components/Admin/AdminHeader';
import { fetcher } from '../../../services/api';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminExperiencePage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ role: '', company: '', period: '', description: '' });

  const loadData = () => {
    fetcher('/api/experience').then((res) => setList(res || [])).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetcher('/api/experience', { method: 'POST', body: JSON.stringify(form) });
    setForm({ role: '', company: '', period: '', description: '' });
    loadData();
  };

  const handleDelete = async (id) => {
    await fetcher(`/api/experience?id=${id}`, { method: 'DELETE' });
    loadData();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Manage Work Experience" />
        <div className="admin-content">
          <form onSubmit={handleAdd} className="admin-card">
            <h3 style={{ color: '#fff', marginBottom: '16px' }}>Add Work Experience</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Job Title / Role</label>
                <input
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="admin-input"
                  placeholder="Senior Engineer"
                />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Company</label>
                <input
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="admin-input"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Time Period</label>
                <input
                  required
                  value={form.period}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                  className="admin-input"
                  placeholder="2024 - Present"
                />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Job Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="admin-input"
              />
            </div>
            <button type="submit" className="btn-primary">
              <Plus size={18} /> Add Experience
            </button>
          </form>

          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Company</th>
                  <th>Period</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((exp) => (
                  <tr key={exp.id}>
                    <td style={{ color: '#fff', fontWeight: 600 }}>{exp.role}</td>
                    <td style={{ color: '#06b6d4' }}>{exp.company}</td>
                    <td>{exp.period}</td>
                    <td>
                      <button onClick={() => handleDelete(exp.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
