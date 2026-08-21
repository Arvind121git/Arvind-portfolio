'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Wrench,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  MessageSquare,
  LogOut,
  ExternalLink,
  Terminal,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'About Info', path: '/admin/about', icon: User },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Skills', path: '/admin/skills', icon: Wrench },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Education', path: '/admin/education', icon: GraduationCap },
    { name: 'Certificates', path: '/admin/certificates', icon: Award },
    { name: 'Resume', path: '/admin/resume', icon: FileText },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <aside
      className="admin-sidebar"
      style={{
        width: '280px',
        minWidth: '280px',
        maxWidth: '280px',
        flexShrink: 0,
        background: '#0b0f1c',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '24px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <div>
        {/* Brand Studio Header */}
        <div style={{ padding: '8px 12px', marginBottom: '28px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
              }}
            >
              <Terminal size={22} />
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.3px', lineHeight: 1.2 }}>
                Arvind<span className="gradient-text">.Studio</span>
              </div>
              <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 500, marginTop: '2px' }}>
                CMS Control Center
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`admin-nav-item ${active ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  color: active ? '#ffffff' : '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  fontWeight: active ? 600 : 500,
                  background: active ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(168, 85, 247, 0.16) 100%)' : 'transparent',
                  border: active ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid transparent',
                  boxShadow: active ? '0 4px 18px rgba(99, 102, 241, 0.2)' : 'none',
                  transition: 'all 0.2s ease',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <Icon size={18} color={active ? '#a855f7' : '#94a3b8'} />
                <span style={{ flex: 1 }}>{item.name}</span>
                {active && <ChevronRight size={14} color="#a855f7" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#94a3b8',
            textDecoration: 'none',
            fontSize: '0.88rem',
            fontWeight: 500,
            padding: '10px 14px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            transition: 'all 0.2s ease',
          }}
        >
          <ExternalLink size={16} />
          <span>View Live Site</span>
        </Link>

        <button
          onClick={logout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#f87171',
            cursor: 'pointer',
            fontSize: '0.88rem',
            fontWeight: 600,
            padding: '10px 14px',
            borderRadius: '10px',
            transition: 'all 0.2s ease',
          }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
