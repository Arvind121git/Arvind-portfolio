'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import AdminHeader from '../../../components/Admin/AdminHeader';
import { fetcher } from '../../../services/api';
import { FolderKanban, Wrench, MessageSquare, Briefcase, Plus, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    skillsCount: 0,
    messagesCount: 0,
    experienceCount: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [proj, sk, msg, exp] = await Promise.all([
          fetcher('/api/projects').catch(() => []),
          fetcher('/api/skills').catch(() => []),
          fetcher('/api/messages').catch(() => []),
          fetcher('/api/experience').catch(() => []),
        ]);

        setStats({
          projectsCount: proj.length || 0,
          skillsCount: sk.length || 0,
          messagesCount: msg.length || 0,
          experienceCount: exp.length || 0,
        });

        setRecentMessages(msg.slice(0, 5) || []);
      } catch (err) {}
    }
    loadData();
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="System Overview & Analytics" />
        <div className="admin-content">
          {/* Top Metric Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '32px',
            }}
          >
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Total Projects</span>
                <FolderKanban size={20} color="#06b6d4" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginTop: '12px' }}>
                {stats.projectsCount}
              </div>
            </div>

            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Total Skills</span>
                <Wrench size={20} color="#6366f1" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginTop: '12px' }}>
                {stats.skillsCount}
              </div>
            </div>

            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Inquiries & Messages</span>
                <MessageSquare size={20} color="#a855f7" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginTop: '12px' }}>
                {stats.messagesCount}
              </div>
            </div>

            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Experience Records</span>
                <Briefcase size={20} color="#22c55e" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginTop: '12px' }}>
                {stats.experienceCount}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="admin-card" style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '16px' }}>
              Quick Management Shortcuts
            </h3>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/admin/projects" className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 18px' }}>
                <Plus size={16} /> Manage Projects
              </Link>
              <Link href="/admin/about" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 18px' }}>
                Edit Bio & Profile
              </Link>
              <Link href="/admin/skills" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 18px' }}>
                Update Skills
              </Link>
              <Link href="/admin/messages" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 18px' }}>
                Check Messages
              </Link>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>Recent Contact Submissions</h3>
              <Link href="/admin/messages" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>View All</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>No messages received yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sender</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMessages.map((m) => (
                    <tr key={m.id}>
                      <td style={{ color: '#fff', fontWeight: 600 }}>{m.name}</td>
                      <td style={{ color: '#94a3b8' }}>{m.email}</td>
                      <td style={{ color: '#cbd5e1' }}>{m.subject}</td>
                      <td style={{ color: '#64748b', fontSize: '0.85rem' }}>
                        {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'Just now'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
