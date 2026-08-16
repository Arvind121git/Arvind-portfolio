'use client';

import React, { useState } from 'react';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import AdminHeader from '../../../components/Admin/AdminHeader';
import { useSkills } from '../../../hooks/useSkills';
import { skillService } from '../../../services/skillService';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminSkillsPage() {
  const { skills, refetch } = useSkills();
  const [form, setForm] = useState({ name: '', category: 'Frontend', level: 90 });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    await skillService.create({ ...form, level: Number(form.level) });
    setForm({ name: '', category: 'Frontend', level: 90 });
    refetch();
  };

  const handleDelete = async (id) => {
    await skillService.delete(id);
    refetch();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Manage Skills" />
        <div className="admin-content">
          <form onSubmit={handleAdd} className="admin-card">
            <h3 style={{ color: '#fff', marginBottom: '16px' }}>Add New Skill</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr auto', gap: '16px', alignItems: 'flex-end' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Skill Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="admin-input"
                  placeholder="e.g. Next.js 14"
                />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="admin-input"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Cloud">Cloud</option>
                </select>
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Level (%)</label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className="admin-input"
                />
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>
                <Plus size={18} /> Add
              </button>
            </div>
          </form>

          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Skill Name</th>
                  <th>Category</th>
                  <th>Proficiency</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((s) => (
                  <tr key={s.id}>
                    <td style={{ color: '#fff', fontWeight: 600 }}>{s.name}</td>
                    <td><span style={{ color: '#818cf8' }}>{s.category}</span></td>
                    <td>{s.level}%</td>
                    <td>
                      <button
                        onClick={() => handleDelete(s.id)}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      >
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
