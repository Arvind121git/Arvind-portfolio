'use client';

import React from 'react';
import { User, MapPin, Mail, Award, CheckCircle } from 'lucide-react';

export default function About({ data }) {
  if (!data) return null;

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            ABOUT ME
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#fff', marginTop: '8px' }}>
            Architecting Modern <span className="gradient-text">Software Experiences</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          <div className="glass-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '16px' }}>
              My Journey & Philosophy
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.02rem', marginBottom: '24px' }}>
              {data.bio}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#e2e8f0' }}>
                <User size={18} color="#06b6d4" />
                <span><strong>Name:</strong> {data.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#e2e8f0' }}>
                <MapPin size={18} color="#6366f1" />
                <span><strong>Location:</strong> {data.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#e2e8f0' }}>
                <Mail size={18} color="#a855f7" />
                <span><strong>Email:</strong> {data.email}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                <Award size={24} />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>Proven Engineering Standards</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Built enterprise microservices, clean scalable APIs, and pixel-perfect design systems.
                </p>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
                <CheckCircle size={24} />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '6px' }}>Full-Stack Mastery</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Deep specialization across Next.js 14 App Router, TypeScript, GraphQL, Node.js, and Cloud Infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
