'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import AdminHeader from '../../../components/Admin/AdminHeader';
import { fetcher } from '../../../services/api';
import { Save, CheckCircle } from 'lucide-react';

export default function AdminAboutPage() {
  const [data, setData] = useState({
    name: '',
    title: '',
    tagline: '',
    bio: '',
    location: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    twitter: '',
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetcher('/api/about')
      .then((res) => {
        if (res) setData({ ...data, ...res });
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    try {
      await fetcher('/api/about', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Manage Bio & Profile Information" />
        <div className="admin-content">
          <form onSubmit={handleSave} className="admin-card">
            {saved && (
              <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <CheckCircle size={18} />
                <span>Profile info updated successfully!</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Full Name</label>
                <input
                  name="name"
                  value={data.name || ''}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>

              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Professional Title</label>
                <input
                  name="title"
                  value={data.title || ''}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Short Tagline</label>
              <input
                name="tagline"
                value={data.tagline || ''}
                onChange={handleChange}
                className="admin-input"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Full Biography</label>
              <textarea
                name="bio"
                rows={5}
                value={data.bio || ''}
                onChange={handleChange}
                className="admin-input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Location</label>
                <input
                  name="location"
                  value={data.location || ''}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Email Address</label>
                <input
                  name="email"
                  value={data.email || ''}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Phone Number</label>
                <input
                  name="phone"
                  value={data.phone || ''}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              <Save size={18} />
              <span>{loading ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
