'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -64px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function AboutPage() {
  useReveal();

  return (
    <>
      <Nav />

      {/* ── Hero — architectural + linen ───────────────── */}
      {/*
        HP_Hero_Desktop_Image.jpg: woman in rust terracotta linen dress seated
        on sun-bleached stone steps. Mediterranean light, architectural backdrop.
        Perfectly captures QOM's linen-first, Egypt-rooted identity.
      */}
      <section style={{ position: 'relative', height: '92vh', overflow: 'hidden', minHeight: '600px' }}>
        <img
          src="/HP_Hero_Desktop_Image.jpg"
          alt="QOM — Egyptian linen, export quality"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
        />
        {/* Split overlay: dark on left for text, transparent on right to show image */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(26,24,20,0.78) 38%, rgba(26,24,20,0.05) 72%)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 64px 80px', maxWidth: '620px' }}>
          <span className="eyebrow eyebrow-light reveal" style={{ marginBottom: '20px' }}>About QOM</span>
          <h1 className="reveal d1" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(52px, 7.5vw, 100px)',
            fontWeight: 300, fontStyle: 'italic',
            lineHeight: 0.93, color: '#F5F0E8',
          }}>Egypt<br />Wears<br />Its Own</h1>
          <p className="reveal d2" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300,
            color: 'rgba(245,240,232,0.5)', marginTop: '28px', maxWidth: '340px', lineHeight: 1.85,
          }}>
            Egypt's first group buying fashion brand. The same export-grade factories that supply the world — now supplying you.
          </p>
        </div>

        {/* Year founded chip */}
        <div style={{
          position: 'absolute', bottom: '80px', right: '64px',
          background: 'rgba(245,240,232,0.92)', backdropFilter: 'blur(8px)',
          padding: '10px 18px',
        }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '11px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(26,24,20,0.5)', letterSpacing: '0.08em' }}>Est. Egypt</span>
        </div>
      </section>

      {/* ── Brand statement ─────────────────────────────── */}
      <section style={{ background: '#1A1814', padding: '80px 64px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <p className="reveal" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(26px, 3.5vw, 44px)',
            fontWeight: 300, fontStyle: 'italic',
            color: '#F5F0E8', lineHeight: 1.25,
            maxWidth: '820px',
            borderLeft: '2px solid #8B6F47', paddingLeft: '36px',
          }}>
            "The same threads and skilled hands that produce for Zara, H&amp;M, and Massimo Dutti have always been Egyptian. We're simply making sure Egypt gets dressed by them first."
          </p>
        </div>
      </section>

      {/* ── Story — 2-column ───────────────────────────── */}
      <section style={{ background: '#F5F0E8' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* Left: text */}
          <div className="reveal-left" style={{ padding: '96px 80px 96px 64px', display: 'flex', flexDirection: 'column', gap: '32px', justifyContent: 'center' }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: '16px' }}>Our Story</span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(34px, 4vw, 52px)',
                fontWeight: 300, fontStyle: 'italic',
                color: '#1A1814', lineHeight: 1.1,
              }}>Born from a<br />simple question</h2>
              <div style={{ width: '40px', height: '2px', background: '#8B6F47', marginTop: '24px' }} />
            </div>

            {[
              "Egypt's best factories produce for the world's biggest fashion names. But some of that production has no home — export surplus with nowhere to go, flawless quality left without a label.",
              "QOM was born from a simple question: why shouldn't Egyptians wear it first?",
              "We are not a clearance brand. We are a direct line from factory to wardrobe — no middlemen, no markup, full pricing transparency. And as Egypt's first group buying fashion brand, we've made it possible to save more when you buy together.",
            ].map((text, i) => (
              <p key={i} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: i === 1 ? '15px' : '14px',
                fontWeight: 300,
                lineHeight: 1.9, color: i === 1 ? '#1A1814' : 'rgba(26,24,20,0.6)',
                fontStyle: i === 1 ? 'italic' : 'normal',
                borderLeft: i === 1 ? '2px solid #8B6F47' : 'none',
                paddingLeft: i === 1 ? '20px' : '0',
              }}>{text}</p>
            ))}
          </div>

          {/* Right: editorial image — man in linen */}
          {/*
            UK_-_DT_Position_1_-_Asset_2.jpg: Two editorial shots of men in linen —
            yellow half-sleeve linen shirt (warm, natural) + white embroidered linen set
            (resort / Mediterranean). Perfect for QOM's Egyptian linen narrative.
          */}
          <div className="img-zoom reveal-right" style={{ overflow: 'hidden', minHeight: '640px', position: 'relative', background: '#E0D9CF' }}>
            <img
              src="/UK_-_DT_Position_1_-_Asset_2.jpg"
              alt="Egyptian linen craftsmanship"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* ── Three-image editorial strip ─────────────────── */}
      {/*
        Row of three editorial portraits:
        1. UK_-_DT_Position_4_-_Asset_1.jpg — emerald/sage clean studio editorial (women)
        2. UK_-_DT_Swipe_Carousel_-_Asset_1.jpg — herringbone wide-leg suit (woman, power)
        3. UK_-_DT_Swipe_Carousel_-_Asset_3.jpg — man in blue striped linen shirt (menswear)
        These set the brand's visual register: clean studio, quality fabric, modern silhouette.
      */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3px', background: '#FAFAF8' }}>
        {[
          { src: '/UK_-_DT_Position_4_-_Asset_1.jpg', alt: 'QOM Women\'s Edit', caption: 'Women\'s Edit' },
          { src: '/UK_-_DT_Swipe_Carousel_-_Asset_1.jpg', alt: 'QOM Power Suits', caption: 'Tailoring' },
          { src: '/UK_-_DT_Swipe_Carousel_-_Asset_3.jpg', alt: 'QOM Men\'s Linen', caption: 'Men\'s Edit' },
        ].map(({ src, alt, caption }, i) => (
          <div key={i} className={`img-zoom reveal d${i + 1}`} style={{ position: 'relative', overflow: 'hidden', background: '#D6CFC3', aspectRatio: '3/4' }}>
            <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(26,24,20,0.5) 0%, transparent 60%)', padding: '24px 20px 20px' }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.8)' }}>{caption}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Stats — split with factory image ────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: '55% 1fr', minHeight: '520px', background: '#FAFAF8' }}>
        {/* Factory / warehouse image */}
        {/*
          /qom/26.jpg: The QOM warehouse/operations space — real factory context.
          This is the anchor for credibility: "here's the real thing".
        */}
        <div className="img-zoom reveal-left" style={{ position: 'relative', overflow: 'hidden', background: '#C8C0B4' }}>
          <img src="/qom/26.jpg" alt="QOM certified factory network" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,24,20,0.3)' }} />
          <div style={{ position: 'absolute', bottom: '32px', left: '36px', right: '36px' }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.65)' }}>Our Certified Factory Network</span>
          </div>
        </div>

        {/* Stats column */}
        <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
          {[
            { n: '+20',   label: 'Certified Factories',  sub: 'All export-grade, internationally verified' },
            { n: '100%',  label: 'Export Quality',       sub: 'Same standard as Zara, H&M, Massimo Dutti' },
            { n: 'Zero',  label: 'Middlemen',            sub: 'Factory floor directly to your front door' },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1, padding: '44px 56px',
              borderBottom: i < 2 ? '1px solid rgba(26,24,20,0.07)' : 'none',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '56px', fontWeight: 300, fontStyle: 'italic', color: '#1A1814', lineHeight: 0.9 }}>{stat.n}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 500, color: '#1A1814', letterSpacing: '0.04em', marginTop: '12px' }}>{stat.label}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 300, color: 'rgba(26,24,20,0.4)', marginTop: '4px', lineHeight: 1.6 }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Group buying concept ─────────────────────────── */}
      {/*
        jyyac1gnhd3fvj2oe9xz.jpg: Clean white editorial — woman in white knit maxi dress.
        Perfect paired with the dark community/group section — the product is the hero,
        the community is what gets it made.
      */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '580px', background: '#FAFAF8' }}>
        {/* Dark text side */}
        <div className="reveal-left" style={{ background: '#1A1814', padding: '80px 72px 80px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '28px' }}>
          <span className="eyebrow eyebrow-light" style={{ marginBottom: '4px' }}>Why Group Buying</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 3.5vw, 48px)',
            fontWeight: 300, fontStyle: 'italic',
            color: '#F5F0E8', lineHeight: 1.1,
          }}>More people.<br />Lower price.<br />Same quality.</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.85, color: 'rgba(245,240,232,0.5)', maxWidth: '380px' }}>
            Egypt's factories work on minimum order quantities. Traditionally, only large brands could meet them. QOM pools demand from individual customers to unlock factory pricing — and pass the full saving to you.
          </p>
          {/* Saving callout */}
          <div style={{ display: 'flex', gap: '40px', marginTop: '8px' }}>
            {[
              { n: 'Up to 15%', label: 'Group discount' },
              { n: '40%+',      label: 'vs. retail markup' },
            ].map(({ n, label }) => (
              <div key={label}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', fontWeight: 300, fontStyle: 'italic', color: '#C4A882', lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginTop: '6px' }}>{label}</div>
              </div>
            ))}
          </div>
          <Link href="/how-it-works" style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#1A1814', background: '#C4A882', border: '1px solid #C4A882',
            padding: '13px 32px', textDecoration: 'none', display: 'inline-block',
            width: 'fit-content', marginTop: '8px', transition: 'background 0.25s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#D4B892')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C4A882')}
          >See How It Works</Link>
        </div>

        {/* Image side */}
        <div className="img-zoom reveal-right" style={{ overflow: 'hidden', position: 'relative', background: '#E8E4DE' }}>
          <img
            src="/jyyac1gnhd3fvj2oe9xz.jpg"
            alt="QOM community fashion"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </div>
      </section>

      {/* ── Full-bleed manifesto ─────────────────────────── */}
      {/*
        /qom/2.png: QOM-branded campaign scene — the brand's own identity imagery.
        Used here as the manifesto moment with a strong pull quote overlay.
      */}
      <section style={{ position: 'relative', minHeight: '56vh', overflow: 'hidden' }}>
        <img src="/qom/2.png" alt="QOM campaign" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,24,20,0.58)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px' }}>
          <p className="reveal" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(26px, 4vw, 52px)',
            fontWeight: 300, fontStyle: 'italic',
            color: '#F5F0E8', lineHeight: 1.2,
            maxWidth: '820px', textAlign: 'center',
          }}>
            "Export quality has always been Egyptian.<br />It's time Egypt wears it first."
          </p>
        </div>
      </section>

      {/* ── Commitments — dark pillars ───────────────────── */}
      <section style={{ background: '#1A1814', padding: '88px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px 48px' }}>
          <span className="eyebrow eyebrow-light reveal" style={{ marginBottom: '14px' }}>What We Stand For</span>
          <h2 className="reveal d1" style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 300, fontStyle: 'italic', color: '#F5F0E8',
          }}>Our Commitments</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'rgba(196,168,130,0.06)' }}>
          {[
            {
              icon: '◎',
              title: 'Zero Surplus',
              body: 'We redirect export overruns that would otherwise go to waste — turning dead stock into living wardrobes. Sustainability as necessity, not slogan.',
            },
            {
              icon: '◈',
              title: 'Made in Egypt',
              body: 'Every piece comes from Egypt\'s certified export factories. The same labour, the same material, the same standard — without the brand tax on top.',
            },
            {
              icon: '◉',
              title: 'Radical Transparency',
              body: 'We show you the factory cost and the margin we take. No hidden fees, no inflated "original prices". If we can\'t justify the number, we don\'t charge it.',
            },
          ].map((pillar, i) => (
            <div key={pillar.title} className={`reveal d${i + 1}`} style={{ background: '#1A1814', padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <span style={{ fontSize: '22px', color: 'rgba(196,168,130,0.6)' }}>{pillar.icon}</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 300, fontStyle: 'italic', color: '#F5F0E8' }}>{pillar.title}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 300, lineHeight: 1.85, color: 'rgba(245,240,232,0.45)' }}>{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      {/*
        UK_-_DT_Swipe_Carousel_-_Asset_2.jpg: woman in printed co-ord on a chair,
        warm editorial studio — a confident final image before the CTA.
      */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '480px', background: '#FAFAF8' }}>
        <div className="img-zoom reveal-left" style={{ overflow: 'hidden', background: '#E0D8CE' }}>
          <img
            src="/UK_-_DT_Swipe_Carousel_-_Asset_2.jpg"
            alt="QOM this season"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </div>
        <div className="reveal-right" style={{ background: '#F5F0E8', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '80px 64px' }}>
          <span className="eyebrow" style={{ marginBottom: '16px' }}>Join Us</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 300, fontStyle: 'italic',
            color: '#1A1814', lineHeight: 1.1, marginBottom: '20px',
          }}>Dress Egypt<br />at its true worth</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.85, color: 'rgba(26,24,20,0.55)', maxWidth: '360px', marginBottom: '40px' }}>
            Browse this season's collection, build your capsule or group box, or back an upcoming piece through community pre-order.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/build" className="btn-primary">Build Your Box</Link>
            <Link href="/season" style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#1A1814', textDecoration: 'none',
              borderBottom: '1px solid rgba(26,24,20,0.4)', paddingBottom: '3px',
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#8B6F47')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(26,24,20,0.4)')}
            >Browse Collection</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
