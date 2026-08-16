'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import AdminHeader from '../../../components/Admin/AdminHeader';
import { fetcher } from '../../../services/api';
import { Plus, Trash2, ExternalLink } from 'lucide-react';

export default function AdminCertificatesPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title: '', issuer: '', date: '', credentialId: '', link: '' });

  const loadData = () => {
    fetcher('/api/certificates').then((res) => setList(res || [])).catch(() => {});
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetcher('/api/certificates', { method: 'POST', body: JSON.stringify(form) });
    setForm({ title: '', issuer: '', date: '', credentialId: '', link: '' });
    loadData();
  };

  const handleDelete = async (id) => {
    await fetcher(`/api/certificates?id=${id}`, { method: 'DELETE' });
    loadData();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Manage Certifications" />
        <div className="admin-content">
          <form onSubmit={handleAdd} className="admin-card">
            <h3 style={{ color: '#fff', marginBottom: '16px' }}>Add Certification</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Certificate Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="admin-input"
                  placeholder="AWS Solutions Architect"
                />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Issuer / Organization</label>
                <input
                  required
                  value={form.issuer}
                  onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                  className="admin-input"
                  placeholder="Amazon Web Services"
                />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Issue Year</label>
                <input
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="admin-input"
                  placeholder="2025"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Credential ID</label>
                <input
                  value={form.credentialId}
                  onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
                  className="admin-input"
                />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Verification URL</label>
                <input
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  className="admin-input"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary">
              <Plus size={18} /> Add Certification
            </button>
          </form>

          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Issuer</th>
                  <th>Year</th>
                  <th>Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((cert) => (
                  <tr key={cert.id}>
                    <td style={{ color: '#fff', fontWeight: 600 }}>{cert.title}</td>
                    <td style={{ color: '#06b6d4' }}>{cert.issuer}</td>
                    <td>{cert.date}</td>
                    <td>
                      {cert.link && <a href={cert.link} target="_blank" rel="noreferrer" style={{ color: '#818cf8' }}><ExternalLink size={16} /></a>}
                    </td>
                    <td>
                      <button onClick={() => handleDelete(cert.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
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
