'use client';

import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ShieldCheck, User } from 'lucide-react';

export default function AdminHeader({ title = 'Admin Dashboard' }) {
  const { user } = useAuth();

  return (
    <header className="admin-header">
      <h1 style={{ fontSize: '1.35rem', color: '#fff' }}>{title}</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '50px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', fontSize: '0.85rem', fontWeight: 600 }}>
          <ShieldCheck size={16} />
          <span>Super Admin</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e2e8f0', fontSize: '0.9rem' }}>
          <User size={18} />
          <span>{user?.name || 'Arvind Kumar'}</span>
        </div>
      </div>
    </header>
  );
}
