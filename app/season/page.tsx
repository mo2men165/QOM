'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { products } from '@/lib/data';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -56px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const TABS = [
  { key: 'all',       label: 'All' },
  { key: 'tops',      label: 'Tops & Shirts' },
  { key: 'trousers',  label: 'Trousers' },
  { key: 'dresses',   label: 'Dresses & Skirts' },
  { key: 'outerwear', label: 'Outerwear' },
  { key: 'new',       label: 'New' },
];

export default function SeasonPage() {
  useReveal();
  const [filter, setFilter] = useState('all');

  const filtered = products.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'new')  return p.isNew;
    return p.filter === filter;
  });

  return (
    <>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '72vh', overflow: 'hidden', paddingTop: '72px' }}>
        <img src="/qom/37.png" alt="This Season"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,24,20,0.72) 0%, rgba(26,24,20,0.15) 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '56px 64px', maxWidth: '1440px' }}>
          <span className="eyebrow eyebrow-light" style={{ marginBottom: '14px' }}>Season 2025</span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(52px, 7vw, 88px)',
            fontWeight: 300, fontStyle: 'italic',
            lineHeight: 1.0, color: '#F5F0E8',
          }}>The Collection</h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
            fontWeight: 300, color: 'rgba(245,240,232,0.55)',
            marginTop: '14px', maxWidth: '360px', lineHeight: 1.75,
          }}>
            Export-quality garments from Egypt's finest certified factories — curated for this season.
          </p>
        </div>
        <div style={{
          position: 'absolute', top: '104px', right: '64px',
          background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(10px)',
          padding: '12px 20px',
        }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 300, fontStyle: 'italic', color: '#1A1814', lineHeight: 1 }}>{products.length}</span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(26,24,20,0.5)', display: 'block', marginTop: '4px' }}>Pieces</span>
        </div>
      </section>

      {/* ── Filter bar ───────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: '72px', zIndex: 50,
        background: 'rgba(250,250,248,0.96)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(26,24,20,0.08)',
      }}>
        <div style={{
          maxWidth: '1440px', margin: '0 auto',
          padding: '0 64px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          height: '54px', gap: '24px',
        }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {TABS.map(t => (
              <button key={t.key} onClick={() => setFilter(t.key)} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px', fontWeight: filter === t.key ? 500 : 400,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: filter === t.key ? '#F5F0E8' : 'rgba(26,24,20,0.5)',
                background: filter === t.key ? '#1A1814' : 'transparent',
                border: 'none', padding: '7px 18px',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>{t.label}</button>
            ))}
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(26,24,20,0.4)' }}>
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>
      </div>

      {/* ── Editorial intro strip ────────────────────────── */}
      <div style={{ background: '#F5F0E8', borderBottom: '1px solid rgba(26,24,20,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 64px', display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ flex: 1 }}>
            <span className="eyebrow" style={{ marginBottom: '8px' }}>Factory Direct</span>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 300, fontStyle: 'italic', color: '#1A1814', lineHeight: 1.35 }}>
              Every piece from Egypt's certified export factories — the same that supply the world's top brands.
            </p>
          </div>
          <Link href="/build" className="btn-primary" style={{ flexShrink: 0 }}>Build Your Box</Link>
        </div>
      </div>

      {/* ── Product grid ─────────────────────────────────── */}
      <div style={{ background: '#FAFAF8' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'rgba(26,24,20,0.4)', fontFamily: "'DM Sans',sans-serif", fontSize: '14px' }}>
            No items in this category yet.
          </div>
        ) : (
          <div style={{ padding: '3px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}>
            {filtered.map((p, i) => (
              <div key={p.id} className={`product-card reveal d${(i % 3) + 1}`}>
                <div className="card-img" style={{ position: 'relative' }}>
                  {p.isNew && (
                    <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2, background: '#1A1814', padding: '4px 12px' }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FAFAF8' }}>New</span>
                    </div>
                  )}
                  <img src={p.img} alt={p.nameEn} />
                </div>
                <div style={{ padding: '20px 22px 24px', background: '#FAFAF8' }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '6px' }}>{p.catEn}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 300, color: '#1A1814', lineHeight: 1.15, marginBottom: '4px' }}>{p.nameEn}</p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 300, color: 'rgba(26,24,20,0.4)', marginBottom: '14px' }}>{p.fabric}</p>
                  <Link href="/build" className="card-cta" style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 500,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#1A1814', textDecoration: 'none',
                    borderBottom: '1px solid rgba(26,24,20,0.3)', paddingBottom: '2px',
                    transition: 'color 0.25s, border-color 0.25s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#8B6F47'; e.currentTarget.style.borderColor = '#8B6F47'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#1A1814'; e.currentTarget.style.borderColor = 'rgba(26,24,20,0.3)'; }}
                  >Add to Box</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── CTA band ─────────────────────────────────────── */}
      <section style={{ background: '#1A1814', padding: '80px 64px', textAlign: 'center' }}>
        <span className="eyebrow eyebrow-light reveal" style={{ marginBottom: '16px' }}>Get Started</span>
        <h2 className="reveal d1" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 300, fontStyle: 'italic',
          color: '#F5F0E8', lineHeight: 1.1, marginBottom: '32px',
        }}>Build Your Box Today</h2>
        <div className="reveal d2" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/build" style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#1A1814', background: '#C4A882', border: '1px solid #C4A882',
            padding: '14px 40px', textDecoration: 'none',
            transition: 'background 0.25s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#D4B892')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C4A882')}
          >Capsule Box — 5 Pieces</Link>
          <Link href="/build" className="btn-outline">Group Box — Save More</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
