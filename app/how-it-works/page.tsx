'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useResponsive } from '@/lib/responsive';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -64px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const STEPS = [
  {
    n: '01',
    title: 'Choose Your Box Type',
    body: 'Pick a 5-piece Capsule Box for yourself, or a 10-piece Group Box to build together with friends and family — and unlock collective savings.',
    tip: 'Group Box saves more the fuller it gets',
    img: '/qom/9.jpg',
    imgPos: 'center',
  },
  {
    n: '02',
    title: 'Pick Your Pieces',
    body: "Browse the season's curated collection and select what you love — every piece hand-picked from certified Egyptian export factories at factory-direct pricing.",
    tip: 'Export quality only, at factory price',
    img: '/qom/10.jpg',
    imgPos: 'center',
  },
  {
    n: '03',
    title: 'Share, Save & Receive',
    body: 'Share your group link with friends. The more who join, the bigger the group discount for everyone. Then wait for delivery directly to your door.',
    tip: 'Free shipping on all orders',
    img: '/qom/20.jpg',
    imgPos: 'center',
  },
];

const FAQ = [
  { q: "What's the difference between Capsule and Group Box?", a: "The Capsule Box is individual — 5 pieces you pick for yourself. The Group Box is 10 pieces built by multiple friends together to unlock a group discount of up to 15%." },
  { q: 'Where do the clothes come from?', a: "From Egypt's best certified export factories — the same ones that produce for global brands like Zara and H&M. We turn their surplus into an opportunity for you." },
  { q: "What's the return policy?", a: 'Free returns within 14 days of delivery. Just keep the original packaging and we handle the rest — no questions asked.' },
  { q: 'How long does delivery take?', a: '2–3 business days in Cairo and Giza, 3–5 days for other governorates. All orders include free shipping.' },
  { q: 'Can each group member pick different pieces?', a: 'Yes — in a Group Box, every member picks their own items from the collection. The group discount applies to everyone once the box is complete.' },
];

export default function HowItWorksPage() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isMobile, isTablet } = useResponsive();
  const px = isMobile ? '20px' : isTablet ? '40px' : '64px';

  return (
    <>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ background: '#1A1814', padding: `${isMobile ? '120px' : '140px'} ${px} ${isMobile ? '64px' : '96px'}` }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <span className="eyebrow eyebrow-light reveal" style={{ marginBottom: '20px' }}>How It Works</span>
          <h1 className="reveal d1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? '48px' : 'clamp(56px, 8vw, 104px)',
            fontWeight: 300, fontStyle: 'italic',
            lineHeight: 0.95, color: '#F5F0E8',
            maxWidth: '700px', whiteSpace: 'pre-line',
          }}>{'Simple.\nTransparent.\nWorth it.'}</h1>
          <p className="reveal d2" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '16px',
            fontWeight: 300, color: 'rgba(245,240,232,0.45)',
            marginTop: '32px', maxWidth: '420px', lineHeight: 1.8,
          }}>
            Egypt's best factories — from source directly to your door. No middlemen. No markup. No mystery.
          </p>
        </div>
      </section>

      {/* ── 3 steps — alternating split sections ─────────── */}
      {STEPS.map((step, i) => (
        <section key={step.n} style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          minHeight: isMobile ? 'auto' : '580px',
          background: i % 2 === 0 ? '#FAFAF8' : '#F5F0E8',
        }}>
          {/* Text panel — always first on mobile */}
          <div className={i === 1 && !isMobile ? 'reveal-right' : 'reveal-left'} style={{
            flex: isMobile ? 'none' : '0 0 44%',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: isMobile ? '48px 20px 32px' : isTablet ? '64px 40px' : '80px 64px',
            gap: '24px',
            order: isMobile ? 0 : (i === 1 ? 2 : 0),
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: isMobile ? '72px' : '100px', fontWeight: 300, fontStyle: 'italic',
              lineHeight: 0.85, color: 'rgba(139,111,71,0.14)',
              display: 'block', userSelect: 'none',
            }}>{step.n}</span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? '28px' : 'clamp(32px, 3.5vw, 44px)',
              fontWeight: 300, fontStyle: 'italic',
              color: '#1A1814', lineHeight: 1.1,
            }}>{step.title}</h2>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: '14px',
              fontWeight: 300, lineHeight: 1.85,
              color: 'rgba(26,24,20,0.55)', maxWidth: '360px',
            }}>{step.body}</p>
            <div style={{ borderLeft: '2px solid #8B6F47', paddingLeft: '16px', marginTop: '8px' }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 400, color: '#8B6F47', fontStyle: 'italic' }}>{step.tip}</p>
            </div>
            {i === 0 && (
              <Link href="/build" className="btn-primary" style={{ width: 'fit-content', marginTop: '8px' }}>Build a Box</Link>
            )}
          </div>

          {/* Image panel — always second on mobile */}
          <div className={`img-zoom ${i === 1 && !isMobile ? 'reveal-left' : 'reveal-right'}`} style={{
            flex: 1, overflow: 'hidden', position: 'relative',
            background: '#E8E2D8',
            minHeight: isMobile ? '60vw' : 'auto',
            order: isMobile ? 1 : (i === 1 ? 0 : 2),
          }}>
            <img src={step.img} alt={step.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: step.imgPos, display: 'block' }} />
          </div>
        </section>
      ))}

      {/* ── Box comparison ───────────────────────────────── */}
      <section style={{ background: '#FAFAF8', padding: `${isMobile ? '64px' : '96px'} ${px}` }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="eyebrow" style={{ marginBottom: '14px' }}>Choose Your Experience</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? '32px' : 'clamp(32px,4vw,48px)', fontWeight: 300, fontStyle: 'italic', color: '#1A1814' }}>Two Ways to Shop</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '3px' }}>
            {[
              {
                tag: 'Individual', name: 'Capsule Box', dark: false,
                points: ['5 hand-picked pieces', 'Instant delivery', 'Free returns', 'Guaranteed export quality'],
                cta: 'Build Your Capsule', href: '/build',
              },
              {
                tag: 'For Groups', name: 'Group Box', dark: true,
                points: ['10 pieces for the group', 'Up to 15% group discount', 'Each member picks their own', 'Share link to invite friends'],
                cta: 'Start Your Group', href: '/build',
              },
            ].map(({ tag, name, dark, points, cta, href }) => (
              <div key={name} className="reveal" style={{ background: dark ? '#1A1814' : '#FFFFFF', padding: isMobile ? '36px 20px' : '56px 48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <span style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: '9px',
                  fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: dark ? '#1A1814' : '#8B6F47',
                  background: dark ? '#C4A882' : '#F5F0E8',
                  padding: '5px 14px', display: 'inline-block', width: 'fit-content',
                }}>{tag}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? '32px' : '40px', fontWeight: 300, fontStyle: 'italic', color: dark ? '#F5F0E8' : '#1A1814' }}>{name}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {points.map(pt => (
                    <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ color: dark ? '#C4A882' : '#8B6F47', fontSize: '14px', flexShrink: 0 }}>✓</span>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 300, color: dark ? 'rgba(245,240,232,0.65)' : 'rgba(26,24,20,0.7)' }}>{pt}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '8px' }}>
                  <Link href={href} style={{
                    display: 'inline-block',
                    fontFamily: "'DM Sans',sans-serif", fontSize: '11px',
                    fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
                    textDecoration: 'none', padding: '14px 40px',
                    color: dark ? '#1A1814' : '#FAFAF8',
                    background: dark ? '#C4A882' : '#1A1814',
                    border: dark ? '1px solid #C4A882' : '1px solid #1A1814',
                    transition: 'background 0.25s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = dark ? '#D4B892' : '#2D2924'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = dark ? '#C4A882' : '#1A1814'; }}
                  >{cta}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section style={{ background: '#F5F0E8', padding: `${isMobile ? '64px' : '96px'} ${px}` }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '56px' }}>
            <span className="eyebrow" style={{ marginBottom: '14px' }}>Have Questions?</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? '32px' : 'clamp(32px,4vw,48px)', fontWeight: 300, fontStyle: 'italic', color: '#1A1814' }}>Frequently Asked</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FAQ.map((item, i) => (
              <div key={i} className="reveal" style={{ borderTop: '1px solid rgba(26,24,20,0.1)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'none', border: 'none', cursor: 'pointer',
                  gap: '24px', padding: '24px 0', textAlign: 'left',
                }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? '17px' : '20px', fontWeight: 400, color: '#1A1814', lineHeight: 1.3 }}>{item.q}</span>
                  <span style={{
                    fontSize: '22px', color: '#8B6F47', flexShrink: 0, lineHeight: 1,
                    transition: 'transform 0.3s ease',
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <p className="fade-up" style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: '14px',
                    fontWeight: 300, lineHeight: 1.85,
                    color: 'rgba(26,24,20,0.6)', paddingBottom: '24px',
                    maxWidth: '680px',
                  }}>{item.a}</p>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(26,24,20,0.1)' }} />
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? '320px' : '420px', display: 'flex', alignItems: 'center' }}>
        <img src="/qom/2.png" alt="QOM community"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,24,20,0.7)' }} />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', textAlign: 'center', padding: `${isMobile ? '56px' : '80px'} ${px}` }}>
          <span className="eyebrow eyebrow-light reveal" style={{ marginBottom: '16px' }}>Ready?</span>
          <h2 className="reveal d1" style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: isMobile ? '36px' : 'clamp(36px,5vw,64px)',
            fontWeight: 300, fontStyle: 'italic',
            color: '#F5F0E8', lineHeight: 1.05, marginBottom: '36px',
          }}>Start Building Together</h2>
          <div className="reveal d2" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/build" style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: '11px',
              fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#1A1814', background: '#C4A882', border: '1px solid #C4A882',
              padding: '14px 40px', textDecoration: 'none', transition: 'background 0.25s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#D4B892')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C4A882')}
            >Build Your Box</Link>
            <Link href="/season" className="btn-outline">Browse Collection</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
