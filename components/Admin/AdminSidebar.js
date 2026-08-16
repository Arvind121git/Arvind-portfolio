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
    <aside className="admin-sidebar">
      <div>
        <div style={{ padding: '8px 16px', marginBottom: '28px' }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.25rem' }}>
            Arvind<span className="gradient-text">.Admin</span>
          </span>
          <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '2px' }}>
            Portfolio CMS Studio
          </div>
        </div>

        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`admin-nav-item ${active ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
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
            padding: '10px 16px',
            borderRadius: '8px',
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
            background: 'transparent',
            border: 'none',
            color: '#ef4444',
            cursor: 'pointer',
            fontSize: '0.88rem',
            padding: '10px 16px',
            borderRadius: '8px',
          }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
