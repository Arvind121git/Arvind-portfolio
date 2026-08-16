'use client';

import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';

export default function Experience({ experience = [] }) {
  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            CAREER PATH
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#fff', marginTop: '8px' }}>
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {experience.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="glass-card"
              style={{
                padding: '32px',
                position: 'relative',
                borderLeft: '4px solid #6366f1',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '4px' }}>
                    {exp.role}
                  </h3>
                  <div style={{ color: '#06b6d4', fontWeight: 600, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={16} />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '50px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                  }}
                >
                  <Calendar size={14} />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem' }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
