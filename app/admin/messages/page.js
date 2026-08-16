'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import AdminHeader from '../../../components/Admin/AdminHeader';
import { fetcher } from '../../../services/api';
import { Trash2, Mail, User, Calendar } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    fetcher('/api/messages')
      .then((res) => setMessages(res || []))
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      await fetcher(`/api/messages?id=${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Inbox Submissions" />
        <div className="admin-content">
          <h2 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '24px' }}>
            Contact Form Messages ({messages.length})
          </h2>

          {loading ? (
            <p style={{ color: '#94a3b8' }}>Loading messages...</p>
          ) : messages.length === 0 ? (
            <div className="admin-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <p style={{ color: '#64748b' }}>Your inbox is empty. No messages received yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {messages.map((m) => (
                <div key={m.id} className="admin-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                    <div>
                      <h3 style={{ color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={18} color="#06b6d4" /> {m.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
                        <Mail size={14} /> {m.email}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ color: '#64748b', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={14} /> {m.createdAt ? new Date(m.createdAt).toLocaleString() : 'Just now'}
                      </span>
                      <button
                        onClick={() => handleDelete(m.id)}
                        style={{ background: 'rgba(239, 68, 68, 0.15)', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(7, 10, 18, 0.6)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.88rem', marginBottom: '8px' }}>
                      Subject: {m.subject}
                    </div>
                    <p style={{ color: '#e2e8f0', lineHeight: 1.6, fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                      {m.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
