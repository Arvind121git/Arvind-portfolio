'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

export default function Projects({ projects = [], limit }) {
  const [activeTab, setActiveTab] = useState('All');

  const displayList = limit ? projects.slice(0, limit) : projects;
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];

  const filteredProjects = activeTab === 'All'
    ? displayList
    : displayList.filter((p) => p.category === activeTab);

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            PORTFOLIO SHOWCASE
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#fff', marginTop: '8px' }}>
            Featured <span className="gradient-text">Engineering Works</span>
          </h2>
        </div>

        {!limit && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '50px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: activeTab === cat ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeTab === cat ? '#fff' : 'var(--text-muted)',
                  fontWeight: activeTab === cat ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '50px',
                      background: 'rgba(6, 182, 212, 0.15)',
                      color: '#06b6d4',
                      fontWeight: 600,
                    }}
                  >
                    {project.category || 'App'}
                  </span>
                  {project.featured && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#eab308' }}>
                      <Sparkles size={14} /> Featured
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '12px' }}>
                  {project.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {(project.tags || []).map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.8rem',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#cbd5e1',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action links */}
              <div style={{ display: 'flex', gap: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '18px' }}>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#06b6d4', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#818cf8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}
                  >
                    <Github size={16} /> Source Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
