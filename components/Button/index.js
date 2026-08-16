'use client';

import React from 'react';

export default function Button({ children, variant = 'primary', onClick, type = 'button', disabled = false, style = {} }) {
  const className = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{ opacity: disabled ? 0.6 : 1, ...style }}
    >
      {children}
    </button>
  );
}
