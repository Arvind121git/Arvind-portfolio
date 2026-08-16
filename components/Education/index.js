'use client';

import React from 'react';
import { GraduationCap, Award } from 'lucide-react';

export default function Education({ education = [] }) {
  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            ACADEMIC BACKGROUND
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#fff', marginTop: '8px' }}>
            Education & <span className="gradient-text">Qualifications</span>
          </h2>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {education.map((edu, idx) => (
            <div
              key={edu.id || idx}
              className="glass-card"
              style={{
                padding: '28px',
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: '#818cf8',
                }}
              >
                <GraduationCap size={28} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>{edu.degree}</h3>
                  <span style={{ color: '#06b6d4', fontSize: '0.9rem', fontWeight: 600 }}>{edu.year}</span>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '4px' }}>
                  {edu.institution}
                </div>
                {edu.grade && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '12px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(34, 197, 94, 0.12)', color: '#4ade80', fontSize: '0.85rem' }}>
                    <Award size={14} /> {edu.grade}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
