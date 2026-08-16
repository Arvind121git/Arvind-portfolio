'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import AdminHeader from '../../../components/Admin/AdminHeader';
import { fetcher } from '../../../services/api';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminEducationPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ degree: '', institution: '', year: '', grade: '' });

  const loadData = () => {
    fetcher('/api/education').then((res) => setList(res || [])).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetcher('/api/education', { method: 'POST', body: JSON.stringify(form) });
    setForm({ degree: '', institution: '', year: '', grade: '' });
    loadData();
  };

  const handleDelete = async (id) => {
    await fetcher(`/api/education?id=${id}`, { method: 'DELETE' });
    loadData();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Manage Academic Education" />
        <div className="admin-content">
          <form onSubmit={handleAdd} className="admin-card">
            <h3 style={{ color: '#fff', marginBottom: '16px' }}>Add Education Degree</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 0.8fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Degree / Course</label>
                <input
                  required
                  value={form.degree}
                  onChange={(e) => setForm({ ...form, degree: e.target.value })}
                  className="admin-input"
                  placeholder="B.Tech Computer Science"
                />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Institution / University</label>
                <input
                  required
                  value={form.institution}
                  onChange={(e) => setForm({ ...form, institution: e.target.value })}
                  className="admin-input"
                  placeholder="NIT / IIT / University"
                />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Years</label>
                <input
                  required
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  className="admin-input"
                  placeholder="2017 - 2021"
                />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Grade / CGPA</label>
                <input
                  value={form.grade}
                  onChange={(e) => setForm({ ...form, grade: e.target.value })}
                  className="admin-input"
                  placeholder="9.2 CGPA"
                />
              </div>
            </div>
            <button type="submit" className="btn-primary">
              <Plus size={18} /> Add Education
            </button>
          </form>

          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Degree</th>
                  <th>Institution</th>
                  <th>Year</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((edu) => (
                  <tr key={edu.id}>
                    <td style={{ color: '#fff', fontWeight: 600 }}>{edu.degree}</td>
                    <td style={{ color: '#06b6d4' }}>{edu.institution}</td>
                    <td>{edu.year}</td>
                    <td>{edu.grade}</td>
                    <td>
                      <button onClick={() => handleDelete(edu.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
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
