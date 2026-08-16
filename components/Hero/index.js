'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Download, Terminal, Award } from 'lucide-react';

export default function Hero({ data }) {
  if (!data) return null;

  return (
    <section
      style={{
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '100px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '48px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Hero Content */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '50px',
                background: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#818cf8',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '24px',
              }}
            >
              <Sparkles size={14} />
              <span>Available for high-impact projects & consulting</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                lineHeight: 1.1,
                marginBottom: '20px',
                color: '#fff',
              }}
            >
              Hi, I&apos;m <span className="gradient-text">{data.name}</span>
            </h1>

            <h2
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
                color: '#e2e8f0',
                fontWeight: 500,
                marginBottom: '20px',
              }}
            >
              {data.title}
            </h2>

            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '560px',
              }}
            >
              {data.tagline || data.bio}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/projects" className="btn-primary">
                <span>Explore Projects</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                <span>Get In Touch</span>
              </Link>
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                marginTop: '48px',
              }}
            >
              {(data.stats || []).map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{ padding: '16px 20px' }}
                >
                  <div className="gradient-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                    {stat.value}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Decorative Graphic */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '480px',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '24px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '16px',
                }}
              >
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 'auto', fontFamily: 'monospace' }}>
                  arvind@portfolio: ~
                </span>
              </div>

              <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.8 }}>
                <div><span style={{ color: '#06b6d4' }}>const</span> <span style={{ color: '#e2e8f0' }}>engineer</span> = &#123;</div>
                <div style={{ paddingLeft: '20px' }}>
                  <span style={{ color: '#94a3b8' }}>name:</span> <span style={{ color: '#86efac' }}>&quot;{data.name}&quot;</span>,
                </div>
                <div style={{ paddingLeft: '20px' }}>
                  <span style={{ color: '#94a3b8' }}>stack:</span> [
                  <span style={{ color: '#fde047' }}>&quot;Next.js&quot;</span>,{' '}
                  <span style={{ color: '#fde047' }}>&quot;TypeScript&quot;</span>,{' '}
                  <span style={{ color: '#fde047' }}>&quot;Cloud API&quot;</span>],
                </div>
                <div style={{ paddingLeft: '20px' }}>
                  <span style={{ color: '#94a3b8' }}>architecture:</span> <span style={{ color: '#86efac' }}>&quot;Ultra Scalable&quot;</span>,
                </div>
                <div style={{ paddingLeft: '20px' }}>
                  <span style={{ color: '#94a3b8' }}>passion:</span> <span style={{ color: '#86efac' }}>&quot;Visual Excellence + Clean Code&quot;</span>
                </div>
                <div>&#125;;</div>
                <div style={{ marginTop: '16px', color: '#6366f1' }}>// Ready to build the extraordinary ✨</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
