'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import AdminHeader from '../../../components/Admin/AdminHeader';
import { fetcher } from '../../../services/api';
import { Save, CheckCircle, FileText } from 'lucide-react';

export default function AdminResumePage() {
  const [resumeUrl, setResumeUrl] = useState('/resume/arvind_resume.pdf');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetcher('/api/about')
      .then((res) => {
        if (res?.resumeUrl) setResumeUrl(res.resumeUrl);
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    await fetcher('/api/about', {
      method: 'PUT',
      body: JSON.stringify({ resumeUrl }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Manage Resume / CV" />
        <div className="admin-content">
          <form onSubmit={handleSave} className="admin-card" style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                <FileText size={28} />
              </div>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.2rem' }}>Resume Document URL</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Update the path or link to your latest PDF resume.
                </p>
              </div>
            </div>

            {saved && (
              <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <CheckCircle size={18} />
                <span>Resume URL saved!</span>
              </div>
            )}

            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Resume Link / File Path</label>
              <input
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                className="admin-input"
                placeholder="/resume/arvind_resume.pdf or Google Drive link"
              />
            </div>

            <button type="submit" className="btn-primary">
              <Save size={18} />
              <span>Save Resume Settings</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
