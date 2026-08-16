'use client';

import React from 'react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Certificate({ certificates = [] }) {
  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            CREDENTIALS
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#fff', marginTop: '8px' }}>
            Licenses & <span className="gradient-text">Certifications</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="glass-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(6, 182, 212, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#06b6d4',
                    }}
                  >
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cert.date}</span>
                    <div style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.9rem' }}>{cert.issuer}</div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '12px' }}>
                  {cert.title}
                </h3>

                {cert.credentialId && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    ID: {cert.credentialId}
                  </div>
                )}
              </div>

              {cert.link && (
                <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#06b6d4', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
