'use client';

import React from 'react';

export default function Card({ children, style = {}, className = 'glass-card' }) {
  return (
    <div className={className} style={{ padding: '24px', ...style }}>
      {children}
    </div>
  );
}
