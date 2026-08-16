'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_NAME, NAV_LINKS } from '../../utils/constants';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(7, 10, 18, 0.95)',
        padding: '60px 0 30px',
        marginTop: '80px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '32px',
            marginBottom: '48px',
          }}
        >
          <div style={{ maxWidth: '360px' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>
              {SITE_NAME} <span className="gradient-text">Portfolio</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Crafting premium digital architectures with cutting-edge full-stack technologies, high performance, and visual excellence.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '16px', fontSize: '1rem' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '16px', fontSize: '1rem' }}>Connect</h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Arvind_portfolio. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            Built with Next.js & <Heart size={14} color="#6366f1" /> by Arvind_portfolio
          </p>
        </div>
      </div>
    </footer>
  );
}
