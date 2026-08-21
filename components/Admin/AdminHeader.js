'use client';

import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ShieldCheck, User, Activity } from 'lucide-react';

export default function AdminHeader({ title = 'Admin Dashboard' }) {
  const { user } = useAuth();

  return (
    <header className="admin-header">
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.3px' }}>
          {title}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Status Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '30px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            color: '#4ade80',
            fontSize: '0.8rem',
            fontWeight: 600,
          }}
        >
          <Activity size={14} className="pulse-icon" />
          <span>System Active</span>
        </div>

        {/* Super Admin Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '30px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#a5b4fc',
            fontSize: '0.82rem',
            fontWeight: 600,
          }}
        >
          <ShieldCheck size={16} color="#818cf8" />
          <span>Super Admin</span>
        </div>

        {/* Profile User Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '5px 12px 5px 6px',
            borderRadius: '30px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
          <span style={{ color: '#f1f5f9', fontSize: '0.88rem', fontWeight: 600 }}>
            {user?.name || 'Arvind Kumar'}
          </span>
        </div>
      </div>
    </header>
  );
}
