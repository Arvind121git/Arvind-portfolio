'use client';

import React, { useState } from 'react';
import { Code, Terminal, Palette, Server, Database, Globe, Cpu, Cloud } from 'lucide-react';

export default function Skills({ skills = [] }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Cloud'];

  const filteredSkills = filter === 'All'
    ? skills
    : skills.filter((item) => item.category === filter);

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            TECHNICAL TOOLKIT
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#fff', marginTop: '8px' }}>
            Core <span className="gradient-text">Skills & Technologies</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: filter === cat ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.04)',
                color: filter === cat ? '#fff' : 'var(--text-muted)',
                fontWeight: filter === cat ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.05rem' }}>
                  {skill.name}
                </span>
                <span style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: '20px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                  {skill.category}
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${skill.level || 85}%`,
                    height: '100%',
                    background: 'var(--accent-gradient)',
                    borderRadius: '4px',
                    transition: 'width 0.8s ease',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Proficiency</span>
                <span>{skill.level || 85}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
