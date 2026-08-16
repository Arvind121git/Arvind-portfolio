'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Phone } from 'lucide-react';
import { messageService } from '../../services/messageService';

export default function Contact({ about }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      await messageService.send(form);
      setStatus({ loading: false, success: true, error: null });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Failed to send message' });
    }
  };

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#818cf8', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            GET IN TOUCH
          </span>
          <h2 style={{ fontSize: '2.5rem', color: '#fff', marginTop: '8px' }}>
            Let&apos;s Build Something <span className="gradient-text">Extraordinary</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '40px',
          }}
          className="contact-grid"
        >
          {/* Contact Details Card */}
          <div className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '16px' }}>
                Contact Information
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
                Whether you have an exciting software project, a job opportunity, or just want to discuss modern architectures, feel free to reach out.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Email Me</div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{about?.email || 'contact@arvind.dev'}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Location</div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{about?.location || 'New Delhi, India'}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Call / WhatsApp</div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{about?.phone || '+91 98765 43210'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '36px', padding: '18px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <span style={{ fontSize: '0.85rem', color: '#818cf8', fontWeight: 600 }}>⚡ Typical Response Time</span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                Usually replies within 12 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '24px' }}>
              Send a Direct Message
            </h3>

            {status.success && (
              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#4ade80',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                <CheckCircle size={20} />
                <span>Message sent successfully! I will get back to you soon.</span>
              </div>
            )}

            {status.error && (
              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                <AlertCircle size={20} />
                <span>{status.error}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="form-row">
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Arvind Kumar"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    background: 'rgba(7, 10, 18, 0.6)',
                    color: '#fff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    background: 'rgba(7, 10, 18, 0.6)',
                    color: '#fff',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project Inquiry / Job Opportunity"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: 'rgba(7, 10, 18, 0.6)',
                  color: '#fff',
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Message *
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or inquiry..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: 'rgba(7, 10, 18, 0.6)',
                  color: '#fff',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className="btn-primary"
              style={{ width: '100%', opacity: status.loading ? 0.7 : 1 }}
            >
              <Send size={18} />
              <span>{status.loading ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
