'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { products } from '@/lib/data';

/* ── scroll-reveal hook ─────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -72px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function HomePage() {
  useReveal();

  const featuredProducts = products.slice(0, 8);

  return (
    <>
      <Nav />

      {/* ══════════════════════════════════════════════════
          1. HERO — full-viewport split screen
          ══════════════════════════════════════════════════ */}
      <section style={{ display: 'flex', minHeight: '100vh', background: '#1A1814', paddingTop: '72px' }}>
        {/* Left: editorial text panel */}
        <div style={{
          flex: '0 0 44%', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '80px 64px',
          gap: '32px', position: 'relative', zIndex: 1,
        }}>
          <div>
            <span className="eyebrow eyebrow-light reveal" style={{ marginBottom: '20px' }}>
              EXPORT · FACTORY · EGYPT
            </span>
            <h1 className="reveal d1" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(64px, 6vw, 96px)',
              fontWeight: 300, fontStyle: 'italic',
              lineHeight: 1.0, letterSpacing: '-0.01em',
              color: '#F5F0E8', whiteSpace: 'pre-line',
              marginTop: '16px',
            }}>{'Export Quality.\nFactory Price.'}</h1>
          </div>
          <p className="reveal d2" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '15px', fontWeight: 300, lineHeight: 1.8,
            color: 'rgba(245,240,232,0.5)', maxWidth: '320px',
          }}>
            Egypt's best factories dress the world's top brands.<br />Now they dress you — direct, transparent, zero markup.
          </p>
          <div className="reveal d3" style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <Link href="/build" className="btn-primary">Build Your Box</Link>
            <Link href="/how-it-works" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 400,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'rgba(196,168,130,0.7)', textDecoration: 'none',
              borderBottom: '1px solid rgba(196,168,130,0.3)', paddingBottom: '3px',
              transition: 'color 0.25s, border-color 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C4A882'; e.currentTarget.style.borderColor = '#C4A882'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(196,168,130,0.7)'; e.currentTarget.style.borderColor = 'rgba(196,168,130,0.3)'; }}
            >How it works</Link>
          </div>

          {/* Bottom stats bar */}
          <div className="reveal d4" style={{
            marginTop: 'auto', paddingTop: '48px',
            display: 'flex', gap: '40px', borderTop: '1px solid rgba(245,240,232,0.08)',
          }}>
            {[{ n: '+20', l: 'Certified Factories' }, { n: '100%', l: 'Export Quality' }, { n: '0', l: 'Middlemen' }].map(s => (
              <div key={s.n}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: '30px',
                  fontWeight: 300, fontStyle: 'italic', color: '#C4A882', lineHeight: 1,
                }}>{s.n}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
                  fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.35)', marginTop: '6px',
                }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image panel with stacked images */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* Main image */}
          <img src="/qom/22.jpg" alt="QOM editorial"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,24,20,0.3) 0%, transparent 40%)' }} />

          {/* Floating bottom-right mini card */}
          <div style={{
            position: 'absolute', bottom: '40px', right: '40px',
            width: '180px', height: '220px', overflow: 'hidden',
            border: '2px solid rgba(245,240,232,0.15)',
          }}>
            <img src="/qom/0.jpg" alt="QOM editorial" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>

          {/* Season label overlay */}
          <div style={{
            position: 'absolute', top: '40px', right: '40px',
            background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(8px)',
            padding: '10px 18px',
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '9px',
              fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#1A1814',
            }}>Season 2025 · New Arrivals</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. MARQUEE STRIP
          ══════════════════════════════════════════════════ */}
      <div dir="ltr" style={{ background: '#1A1814', height: '48px', overflow: 'hidden', display: 'flex', alignItems: 'center', borderTop: '1px solid rgba(196,168,130,0.12)' }}>
        <div className="ticker-track">
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
            fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(196,168,130,0.55)', padding: '0 32px',
          }}>
            Made in Egypt &nbsp;·&nbsp; Export Quality &nbsp;·&nbsp; Factory Direct &nbsp;·&nbsp; Zero Surplus &nbsp;·&nbsp; Group Buying Pioneers &nbsp;·&nbsp; Made in Egypt &nbsp;·&nbsp; Export Quality &nbsp;·&nbsp; Factory Direct &nbsp;·&nbsp; Zero Surplus &nbsp;·&nbsp; Group Buying Pioneers &nbsp;·&nbsp; Made in Egypt &nbsp;·&nbsp; Export Quality &nbsp;·&nbsp; Factory Direct &nbsp;·&nbsp; Zero Surplus &nbsp;·&nbsp; Group Buying Pioneers &nbsp;·&nbsp;
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          3. CAMPAIGN BANNER — full-bleed editorial
          ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
        <img src="/qom/2.png" alt="The QOM Edit"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,24,20,0.25) 0%, rgba(26,24,20,0.6) 100%)' }} />
        <div style={{
          position: 'relative', zIndex: 1, height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 48px', gap: '28px',
        }}>
          <span className="eyebrow eyebrow-light reveal" style={{ fontSize: '9px', letterSpacing: '0.28em' }}>
            THE QOM EDIT · SEASON 2025
          </span>
          <h2 className="reveal d1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(56px, 8vw, 112px)',
            fontWeight: 300, fontStyle: 'italic',
            lineHeight: 0.95, color: '#F5F0E8',
            maxWidth: '800px', whiteSpace: 'pre-line',
          }}>{'Fashion,\nGroup Bought.'}</h2>
          <p className="reveal d2" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
            fontWeight: 300, color: 'rgba(245,240,232,0.65)', maxWidth: '420px', lineHeight: 1.75,
          }}>
            Egypt's first brand to pioneer group buying in fashion. The more who join, the more everyone saves.
          </p>
          <div className="reveal d3">
            <Link href="/build" className="btn-outline" style={{ marginTop: '8px' }}>Start Building</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. EDITORIAL COLLECTION GRID — asymmetric 3-panel
          ══════════════════════════════════════════════════ */}
      <section style={{ background: '#FAFAF8', padding: '3px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gridTemplateRows: '380px 380px', gap: '3px' }}>
          {/* Left tall cell */}
          <div className="img-zoom reveal-left" style={{ gridRow: '1 / 3', position: 'relative', background: '#E8E2D8', overflow: 'hidden' }}>
            <img src="/qom/27.jpg" alt="Women's Edit"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,24,20,0.55) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '36px' }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.7)', display: 'block', marginBottom: '10px' }}>Women</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', fontWeight: 300, fontStyle: 'italic', color: '#F5F0E8', lineHeight: 1.1, marginBottom: '18px' }}>The Women's Edit</h3>
              <Link href="/season" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4A882', textDecoration: 'none', borderBottom: '1px solid rgba(196,168,130,0.4)', paddingBottom: '2px' }}>Shop Now</Link>
            </div>
          </div>

          {/* Top right */}
          <div className="img-zoom reveal-right" style={{ position: 'relative', background: '#D6CFC3', overflow: 'hidden' }}>
            <img src="/qom/56.jpg" alt="Men's Edit"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,24,20,0.5) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px' }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.7)', display: 'block', marginBottom: '8px' }}>Men</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '26px', fontWeight: 300, fontStyle: 'italic', color: '#F5F0E8', lineHeight: 1.1, marginBottom: '14px' }}>The Men's Edit</h3>
              <Link href="/season" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4A882', textDecoration: 'none', borderBottom: '1px solid rgba(196,168,130,0.4)', paddingBottom: '2px' }}>Shop Now</Link>
            </div>
          </div>

          {/* Bottom right */}
          <div className="img-zoom reveal-right d2" style={{ position: 'relative', background: '#2A2620', overflow: 'hidden' }}>
            <img src="/qom/9.jpg" alt="The Essentials"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', opacity: 0.85 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,24,20,0.65) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px' }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.7)', display: 'block', marginBottom: '8px' }}>Essentials</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '26px', fontWeight: 300, fontStyle: 'italic', color: '#F5F0E8', lineHeight: 1.1, marginBottom: '14px' }}>The Essentials</h3>
              <Link href="/season" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4A882', textDecoration: 'none', borderBottom: '1px solid rgba(196,168,130,0.4)', paddingBottom: '2px' }}>Explore</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. GROUP BUYING USP — dark feature split
          ══════════════════════════════════════════════════ */}
      <section style={{ display: 'flex', minHeight: '600px', background: '#FAFAF8' }}>
        {/* Dark left panel */}
        <div style={{
          flex: '0 0 46%', background: '#1A1814',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '80px 64px', gap: '32px',
        }}>
          <span className="eyebrow reveal" style={{ color: 'rgba(196,168,130,0.7)' }}>Egypt's First</span>
          <h2 className="reveal d1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 4vw, 60px)',
            fontWeight: 300, fontStyle: 'italic',
            lineHeight: 1.05, color: '#F5F0E8',
          }}>The More Who Join,<br />The More You Save</h2>
          <p className="reveal d2" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
            fontWeight: 300, lineHeight: 1.85, color: 'rgba(245,240,232,0.5)',
            maxWidth: '340px',
          }}>
            We pioneered group buying in Egyptian fashion. Invite friends, build a box together — every additional member unlocks a deeper discount for everyone in the group.
          </p>
          <div className="reveal d3" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { n: '01', t: 'Choose a Group Box', d: 'Select 10 pieces — each member picks their own.' },
              { n: '02', t: 'Invite & Build Together', d: 'Share the link. Everyone joins and selects.' },
              { n: '03', t: 'Save More, Receive Together', d: 'The fuller the box, the deeper the group discount.' },
            ].map(step => (
              <div key={step.n} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(196,168,130,0.4)', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{step.n}</span>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.04em', color: '#F5F0E8', marginBottom: '4px' }}>{step.t}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 300, color: 'rgba(245,240,232,0.4)', lineHeight: 1.65 }}>{step.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal d4" style={{ marginTop: '8px' }}>
            <Link href="/build" className="btn-primary" style={{ color: '#1A1814', background: '#C4A882', borderColor: '#C4A882' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4B892'; e.currentTarget.style.borderColor = '#D4B892'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#C4A882'; e.currentTarget.style.borderColor = '#C4A882'; }}
            >Start a Group Box</Link>
          </div>
        </div>

        {/* Right image */}
        <div className="img-zoom reveal-right" style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#E8E2D8' }}>
          <img src="/qom/20.jpg" alt="QOM Group Box"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
          {/* Floating discount badge */}
          <div style={{
            position: 'absolute', top: '40px', right: '40px',
            width: '96px', height: '96px', borderRadius: '50%',
            background: '#8B6F47', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 300, fontStyle: 'italic', color: '#F5F0E8', lineHeight: 1 }}>15%</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.8)', marginTop: '4px' }}>Group Save</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. NEW ARRIVALS — 4-column product grid
          ══════════════════════════════════════════════════ */}
      <section style={{ background: '#F5F0E8', padding: '88px 0 0' }}>
        <div style={{ padding: '0 64px', maxWidth: '1440px', margin: '0 auto' }}>
          {/* Header */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', gap: '24px' }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: '12px' }}>Season 2025</span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 300, fontStyle: 'italic',
                color: '#1A1814', lineHeight: 1.0,
              }}>New Arrivals</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(26,24,20,0.1)', minWidth: '80px' }} />
              <Link href="/season" className="btn-ghost">View All</Link>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ padding: '0 64px', maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px' }}>
            {featuredProducts.map((p, i) => (
              <div key={p.id} className={`product-card reveal d${Math.min(i % 4 + 1, 6)}`}>
                <div className="card-img">
                  {p.isNew && (
                    <div style={{
                      position: 'absolute', top: '14px', left: '14px', zIndex: 2,
                      background: '#1A1814', padding: '4px 10px',
                    }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', fontWeight: 500, letterSpacing: '0.14em', color: '#FAFAF8', textTransform: 'uppercase' }}>New</span>
                    </div>
                  )}
                  <img src={p.img} alt={p.nameEn} />
                </div>
                <div style={{ padding: '16px 18px 20px' }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '5px' }}>{p.catEn}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', fontWeight: 300, color: '#1A1814', lineHeight: 1.2, marginBottom: '3px' }}>{p.nameEn}</p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 300, color: 'rgba(26,24,20,0.4)', marginBottom: '10px' }}>{p.fabric}</p>
                  <Link href="/build" className="card-cta" style={{
                    display: 'inline-block',
                    fontFamily: "'DM Sans',sans-serif", fontSize: '10px',
                    fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
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
        </div>

        {/* Full-width CTA band beneath grid */}
        <div className="reveal" style={{ textAlign: 'center', padding: '56px 64px 88px', maxWidth: '1440px', margin: '0 auto' }}>
          <Link href="/season" className="btn-primary">Explore Full Collection</Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. BRAND MANIFESTO — full-bleed dark quote
          ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '70vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <img src="/qom/42.jpg" alt="QOM craftsmanship"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,24,20,0.78)' }} />
        <div style={{
          position: 'relative', zIndex: 1, textAlign: 'center',
          padding: '80px 64px', maxWidth: '1000px', margin: '0 auto', width: '100%',
        }}>
          <span className="eyebrow eyebrow-light reveal" style={{ marginBottom: '28px' }}>Our Story</span>
          <blockquote className="reveal d1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 4.5vw, 60px)',
            fontWeight: 300, fontStyle: 'italic',
            lineHeight: 1.15, color: '#F5F0E8',
            borderLeft: 'none', margin: 0,
          }}>
            "Not a clearance seller. A direct bridge between Egypt's finest factories and your wardrobe."
          </blockquote>
          <p className="reveal d2" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
            fontWeight: 300, lineHeight: 1.85,
            color: 'rgba(245,240,232,0.5)', marginTop: '32px', maxWidth: '560px', marginInline: 'auto',
          }}>
            The same factories that dress Zara, H&M, and Massimo Dutti. The same materials, the same craftsmanship — without the middleman, without the markup.
          </p>
          <div className="reveal d3" style={{ display: 'flex', justifyContent: 'center', gap: '64px', marginTop: '56px' }}>
            {[{ n: '+20', l: 'Partner Factories' }, { n: '100%', l: 'Export Grade' }, { n: '15%', l: 'Group Savings' }].map(s => (
              <div key={s.n} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '40px', fontWeight: 300, fontStyle: 'italic', color: '#C4A882', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginTop: '8px' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div className="reveal d4" style={{ marginTop: '48px' }}>
            <Link href="/about" className="btn-outline">Read Our Story</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. EDITORIAL IMAGE STRIP — 5-panel pure photography
          ══════════════════════════════════════════════════ */}
      <section style={{ background: '#1A1814', padding: '3px 0', display: 'flex', gap: '3px', overflow: 'hidden' }}>
        {[
          { src: '/qom/1.jpg',   h: '460px' },
          { src: '/qom/33.jpg',  h: '460px' },
          { src: '/qom/47.jpg',  h: '460px' },
          { src: '/qom/6.jpg',   h: '460px' },
          { src: '/qom/43.jpg',  h: '460px' },
        ].map(({ src, h }, i) => (
          <div key={src} className="img-zoom reveal" style={{
            flex: 1, height: h, position: 'relative', overflow: 'hidden',
            background: '#2A2620', minWidth: 0,
          }}>
            <img src={src} alt="QOM editorial" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
          </div>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════
          9. HOW IT WORKS — clean numbered steps
          ══════════════════════════════════════════════════ */}
      <section style={{ background: '#FAFAF8', padding: '96px 64px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* Header */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '72px' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 3.5vw, 48px)',
              fontWeight: 300, fontStyle: 'italic', color: '#1A1814', whiteSpace: 'nowrap',
            }}>How It Works</h2>
            <div style={{ flex: 1, height: '1px', background: 'rgba(26,24,20,0.1)' }} />
            <Link href="/how-it-works" className="btn-ghost">Full Guide</Link>
          </div>

          {/* Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '64px' }}>
            {[
              { n: '01', title: 'Choose Your Box', desc: 'Pick a 5-piece Capsule for yourself, or a 10-piece Group Box to build with friends and family for collective savings.' },
              { n: '02', title: 'Pick Your Pieces', desc: "Browse the season's curated collection. Every garment is hand-selected from Egypt's certified export factories." },
              { n: '03', title: 'Share, Save & Receive', desc: 'Share your group link. The fuller the box, the bigger the discount for everyone — delivered directly to your door.' },
            ].map((step, i) => (
              <div key={step.n} className={`reveal d${i + 1}`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: '72px', fontWeight: 300, fontStyle: 'italic',
                  lineHeight: 0.85, color: 'rgba(139,111,71,0.18)', display: 'block',
                }}>{step.n}</span>
                <div style={{ width: '28px', height: '1px', background: '#8B6F47' }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond','Cairo',serif", fontSize: '24px', fontWeight: 400, color: '#1A1814', letterSpacing: '0.01em' }}>{step.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 300, lineHeight: 1.9, color: 'rgba(26,24,20,0.52)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          10. BOX SHOWCASE — capsule vs group with imagery
          ══════════════════════════════════════════════════ */}
      <section style={{ background: '#F5F0E8', padding: '96px 64px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="eyebrow" style={{ marginBottom: '14px' }}>This Season</span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 4vw, 52px)',
              fontWeight: 300, fontStyle: 'italic', color: '#1A1814',
            }}>Build Your Box</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
            {[
              {
                tag: 'Individual', name: 'Capsule Box', pieces: '5 pieces',
                desc: "Your essential wardrobe kit. 5 hand-picked pieces from Egypt's finest factories, delivered to your door.",
                perks: ['5 pieces', 'Instant delivery', 'Free returns'],
                img: '/qom/46.jpg', dark: false,
              },
              {
                tag: 'For Groups', name: 'Group Box', pieces: '10 shared pieces',
                desc: "Share the link with friends — the more who join, the bigger the group discount for every member.",
                perks: ['10 pieces', 'Group savings', 'Individual picks'],
                img: '/qom/37.png', dark: true,
              },
            ].map(({ tag, name, pieces, desc, perks, img, dark }) => (
              <div key={name} style={{ background: dark ? '#1A1814' : '#FFFFFF', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} className="reveal">
                <div className="img-zoom" style={{ height: '420px', position: 'relative', overflow: 'hidden' }}>
                  <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                  <div style={{ position: 'absolute', top: '22px', left: '22px', background: dark ? '#C4A882' : 'rgba(250,250,248,0.92)', padding: '5px 14px' }}>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: dark ? '#1A1814' : '#1A1814' }}>{tag}</span>
                  </div>
                </div>
                <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', fontWeight: 300, fontStyle: 'italic', color: dark ? '#F5F0E8' : '#1A1814' }}>{name}</h3>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 300, color: dark ? 'rgba(245,240,232,0.4)' : 'rgba(26,24,20,0.4)' }}>{pieces}</span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: dark ? 'rgba(245,240,232,0.55)' : 'rgba(26,24,20,0.55)', maxWidth: '340px' }}>{desc}</p>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '4px', flexWrap: 'wrap' }}>
                    {perks.map(perk => (
                      <span key={perk} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? 'rgba(196,168,130,0.8)' : '#8B6F47', borderBottom: `1px solid ${dark ? 'rgba(196,168,130,0.25)' : 'rgba(139,111,71,0.25)'}`, paddingBottom: '2px' }}>✓ {perk}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <Link href="/build" className={dark ? 'btn-primary' : 'btn-primary'}
                      style={dark ? { color: '#1A1814', background: '#C4A882', borderColor: '#C4A882' } : {}}
                      onMouseEnter={e => { if (dark) { e.currentTarget.style.background = '#D4B892'; } }}
                      onMouseLeave={e => { if (dark) { e.currentTarget.style.background = '#C4A882'; } }}
                    >Start Building</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          11. WHY QOM — pillars with dark bg image
          ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/qom/10.jpg" alt="QOM collection"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,24,20,0.82)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '88px 64px', maxWidth: '1440px', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <span className="eyebrow eyebrow-light">Why QOM</span>
            <h2 className="h-display h-display-light" style={{ fontSize: 'clamp(32px,4vw,48px)', marginTop: '12px', maxWidth: '480px' }}>More Than Just Clothes</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px' }}>
            {[
              { icon: '◎', title: 'Zero Surplus', desc: 'We turn export overruns into real opportunity — not landfill. Sustainability as necessity, not slogan.' },
              { icon: '◈', title: 'Made in Egypt', desc: "The same factories that dress the world's top brands — now dressing you, without the markup." },
              { icon: '◉', title: 'Together We Save', desc: 'Our group box model makes export-quality fashion accessible to every Egyptian.' },
            ].map((p, i) => (
              <div key={p.title} className={`reveal d${i + 1}`} style={{
                background: 'rgba(250,250,248,0.06)',
                border: '1px solid rgba(245,240,232,0.1)',
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: '14px',
              }}>
                <span style={{ fontSize: '20px', color: 'rgba(196,168,130,0.75)' }}>{p.icon}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '24px', fontWeight: 300, fontStyle: 'italic', color: '#F5F0E8' }}>{p.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 300, lineHeight: 1.85, color: 'rgba(245,240,232,0.5)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          12. NEWSLETTER / FINAL CTA
          ══════════════════════════════════════════════════ */}
      <section style={{ background: '#1A1814', padding: '88px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <span className="eyebrow eyebrow-light reveal" style={{ marginBottom: '16px' }}>Join the Community</span>
          <h2 className="reveal d1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 300, fontStyle: 'italic',
            color: '#F5F0E8', lineHeight: 1.1, marginBottom: '20px',
          }}>Early Access. Exclusive Drops.<br />Group Savings.</h2>
          <p className="reveal d2" style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: '13px',
            fontWeight: 300, lineHeight: 1.8,
            color: 'rgba(245,240,232,0.45)', marginBottom: '36px',
          }}>
            Be first to know about new collections, group buying events, and factory direct drops.
          </p>
          <form className="reveal d3" onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: '0', maxWidth: '440px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1, padding: '14px 20px',
                fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 300,
                background: 'rgba(245,240,232,0.07)',
                border: '1px solid rgba(245,240,232,0.15)',
                borderRight: 'none',
                color: '#F5F0E8', outline: 'none',
              }}
            />
            <button type="submit" style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: '11px',
              fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
              background: '#8B6F47', color: '#F5F0E8',
              border: '1px solid #8B6F47', padding: '14px 28px',
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'background 0.25s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#9E7F55')}
              onMouseLeave={e => (e.currentTarget.style.background = '#8B6F47')}
            >Subscribe</button>
          </form>
          <div className="reveal d4" style={{ marginTop: '56px' }}>
            <Link href="/build" className="btn-outline">Build Your Box Now</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
