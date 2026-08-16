'use client';

import React, { useState } from 'react';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import AdminHeader from '../../../components/Admin/AdminHeader';
import { useProjects } from '../../../hooks/useProjects';
import { projectService } from '../../../services/projectService';
import { Plus, Trash2, ExternalLink } from 'lucide-react';

export default function AdminProjectsPage() {
  const { projects, refetch } = useProjects();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'Full Stack',
    description: '',
    tags: 'Next.js, TypeScript',
    liveUrl: '',
    githubUrl: '',
    featured: true,
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    const tagList = form.tags.split(',').map((t) => t.trim()).filter(Boolean);
    await projectService.create({ ...form, tags: tagList });
    setShowModal(false);
    setForm({
      title: '',
      category: 'Full Stack',
      description: '',
      tags: '',
      liveUrl: '',
      githubUrl: '',
      featured: true,
    });
    refetch();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      await projectService.delete(id);
      refetch();
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Manage Projects" />
        <div className="admin-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#fff' }}>Portfolio Projects</h2>
            <button onClick={() => setShowModal(true)} className="btn-primary">
              <Plus size={18} />
              <span>Add New Project</span>
            </button>
          </div>

          {showModal && (
            <form onSubmit={handleAdd} className="admin-card" style={{ marginBottom: '32px' }}>
              <h3 style={{ color: '#fff', marginBottom: '20px' }}>New Project Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Project Title</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Tech Tags (comma separated)</label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="admin-input"
                  placeholder="Next.js, TypeScript, Tailwind"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Live Demo URL</label>
                  <input
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>GitHub Repo URL</label>
                  <input
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn-primary">Save Project</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          )}

          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Tags</th>
                  <th>Links</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id}>
                    <td style={{ color: '#fff', fontWeight: 600 }}>{p.title}</td>
                    <td><span style={{ color: '#06b6d4', fontSize: '0.85rem' }}>{p.category}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {(p.tags || []).map((t, i) => (
                          <span key={i} style={{ fontSize: '0.75rem', padding: '2px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#818cf8', marginRight: '10px' }}><ExternalLink size={16} /></a>}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(p.id)}
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
