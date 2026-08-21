'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../../components/Admin/AdminSidebar';
import AdminHeader from '../../../components/Admin/AdminHeader';
import { fetcher } from '../../../services/api';
import {
  FolderKanban,
  Wrench,
  MessageSquare,
  Briefcase,
  Plus,
  ArrowUpRight,
  Sparkles,
  User,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    skillsCount: 0,
    messagesCount: 0,
    experienceCount: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div
      className="admin-layout"
      style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#070913',
        color: '#f8fafc',
      }}
    >
      <AdminSidebar />

      <div
        className="admin-main"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          backgroundColor: '#070913',
        }}
      >
        <AdminHeader title="Dashboard & System Analytics" />

        <div className="admin-content" style={{ padding: '36px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          
          {/* Welcome Banner */}
          <div
            className="admin-card"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.14) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.35)',
              marginBottom: '32px',
              padding: '30px 36px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
              boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a5b4fc', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                <Sparkles size={16} />
                <span>Control Center Active</span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
                Welcome back, <span className="gradient-text">Arvind</span>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.94rem', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
                Manage your portfolio projects, skills, certificates, and check real-time contact inquiries from one unified dashboard.
              </p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="btn-primary"
              style={{ padding: '12px 22px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Preview Live Site</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Top Metric Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '22px',
              marginBottom: '32px',
            }}
          >
            {/* Projects Metric */}
            <div
              className="stat-card"
              style={{
                background: 'linear-gradient(145deg, #0e1428 0%, #111832 100%)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '20px',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Total Projects
                  </span>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginTop: '10px', lineHeight: 1 }}>
                    {stats.projectsCount}
                  </div>
                </div>
                <div className="stat-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FolderKanban size={24} />
                </div>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge-status info">Active Case Studies</span>
              </div>
            </div>

            {/* Skills Metric */}
            <div
              className="stat-card"
              style={{
                background: 'linear-gradient(145deg, #0e1428 0%, #111832 100%)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '20px',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Skills & Tech
                  </span>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginTop: '10px', lineHeight: 1 }}>
                    {stats.skillsCount}
                  </div>
                </div>
                <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Wrench size={24} />
                </div>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge-status info">Tech Stack Items</span>
              </div>
            </div>

            {/* Messages Metric */}
            <div
              className="stat-card"
              style={{
                background: 'linear-gradient(145deg, #0e1428 0%, #111832 100%)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '20px',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Messages Recv.
                  </span>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginTop: '10px', lineHeight: 1 }}>
                    {stats.messagesCount}
                  </div>
                </div>
                <div className="stat-icon-wrapper" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={24} />
                </div>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge-status success">Form Inquiries</span>
              </div>
            </div>

            {/* Experience Metric */}
            <div
              className="stat-card"
              style={{
                background: 'linear-gradient(145deg, #0e1428 0%, #111832 100%)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '20px',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Career Roles
                  </span>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginTop: '10px', lineHeight: 1 }}>
                    {stats.experienceCount}
                  </div>
                </div>
                <div className="stat-icon-wrapper" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Briefcase size={24} />
                </div>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge-status success">Verified History</span>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts Bar */}
          <div
            className="admin-card"
            style={{
              background: '#0d1326',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '28px',
              marginBottom: '32px',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
              Quick Action Management Shortcuts
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' }}>
              <Link
                href="/admin/projects"
                className="btn-primary"
                style={{ fontSize: '0.88rem', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Plus size={16} /> Manage Projects
              </Link>
              <Link
                href="/admin/about"
                className="btn-secondary"
                style={{ fontSize: '0.88rem', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <User size={16} /> Edit Profile Bio
              </Link>
              <Link
                href="/admin/skills"
                className="btn-secondary"
                style={{ fontSize: '0.88rem', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Wrench size={16} /> Update Skills
              </Link>
              <Link
                href="/admin/experience"
                className="btn-secondary"
                style={{ fontSize: '0.88rem', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Briefcase size={16} /> Edit Experience
              </Link>
              <Link
                href="/admin/messages"
                className="btn-secondary"
                style={{ fontSize: '0.88rem', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <MessageSquare size={16} /> Check Inquiries
              </Link>
            </div>
          </div>

          {/* Recent Contact Submissions */}
          <div
            className="admin-card"
            style={{
              background: '#0d1326',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '28px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>Recent Contact Form Submissions</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>Latest inquiries sent from portfolio contact page</p>
              </div>
              <Link
                href="/admin/messages"
                style={{
                  color: '#818cf8',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: 'rgba(99, 102, 241, 0.12)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                }}
              >
                <span>View All Inquiries</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                Loading recent messages...
              </div>
            ) : recentMessages.length === 0 ? (
              <div
                style={{
                  padding: '44px 20px',
                  textAlign: 'center',
                  background: 'rgba(7, 10, 18, 0.5)',
                  borderRadius: '14px',
                  border: '1px dashed rgba(255, 255, 255, 0.1)',
                }}
              >
                <MessageSquare size={36} color="#475569" style={{ marginBottom: '12px' }} />
                <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>No messages received yet.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Sender Name</th>
                      <th>Email Address</th>
                      <th>Subject</th>
                      <th>Received Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentMessages.map((m) => (
                      <tr key={m.id}>
                        <td style={{ color: '#ffffff', fontWeight: 600 }}>{m.name}</td>
                        <td style={{ color: '#a5b4fc' }}>{m.email}</td>
                        <td style={{ color: '#cbd5e1' }}>{m.subject || 'General Inquiry'}</td>
                        <td style={{ color: '#64748b', fontSize: '0.85rem' }}>
                          {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'Just now'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
