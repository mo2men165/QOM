'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { content } from '@/lib/content';

export default function Nav() {
  const { lang, toggleLang } = useStore();
  const c = content[lang].nav;
  const isAr = lang === 'ar';
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ink   = scrolled ? '#1A1814'               : '#F5F0E8';
  const inkSub = scrolled ? 'rgba(26,24,20,0.55)'  : 'rgba(245,240,232,0.65)';
  const bg    = scrolled ? 'rgba(250,250,248,0.96)' : 'transparent';
  const border = scrolled ? '1px solid rgba(26,24,20,0.08)' : '1px solid transparent';

  return (
    <>
      <nav
        dir={isAr ? 'rtl' : 'ltr'}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          background: bg,
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: border,
          transition: 'background 0.45s ease, border-color 0.45s ease',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 64px', height: '72px',
          maxWidth: '1440px', margin: '0 auto',
        }}>
          {/* Logo */}
          <Link href="/" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '26px', fontWeight: 300,
            letterSpacing: '0.2em', fontStyle: 'italic',
            color: ink, textDecoration: 'none', flexShrink: 0,
            transition: 'color 0.4s ease',
          }}>
            QOM
          </Link>

          {/* Centre nav links */}
          <div className="hide-mobile" style={{ display: 'flex', gap: '44px', alignItems: 'center' }}>
            {c.items.map(item => {
              const isActive = pathname === item.href;
              const isPreorder = item.href === '/preorder';
              return (
                <Link key={item.href} href={item.href} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px', fontWeight: isActive ? 500 : 400,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: isActive ? ink : inkSub, textDecoration: 'none',
                  transition: 'color 0.25s ease', whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  borderBottom: isActive ? `1px solid ${ink}` : '1px solid transparent',
                  paddingBottom: '2px',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = ink)}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive ? ink : inkSub)}
                >
                  {isPreorder && (
                    <span style={{
                      display: 'inline-block', width: '5px', height: '5px',
                      borderRadius: '50%', background: '#8B6F47',
                      flexShrink: 0, animation: 'pulse 1.4s ease infinite',
                    }} />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexShrink: 0 }}>
            <button onClick={toggleLang} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px', fontWeight: 400,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: inkSub, padding: '4px 0',
              transition: 'color 0.25s ease',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = ink)}
              onMouseLeave={e => (e.currentTarget.style.color = inkSub)}
            >{c.langSwitch}</button>

            <div style={{ width: '1px', height: '16px', background: scrolled ? 'rgba(26,24,20,0.12)' : 'rgba(245,240,232,0.2)', transition: 'background 0.4s' }} />

            <Link href="/build" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', whiteSpace: 'nowrap',
              padding: '10px 26px',
              color: scrolled ? '#FAFAF8' : '#1A1814',
              background: scrolled ? '#1A1814' : '#F5F0E8',
              transition: 'background 0.35s ease, color 0.35s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#8B6F47'; e.currentTarget.style.color = '#FAFAF8'; }}
              onMouseLeave={e => { e.currentTarget.style.background = scrolled ? '#1A1814' : '#F5F0E8'; e.currentTarget.style.color = scrolled ? '#FAFAF8' : '#1A1814'; }}
            >{c.cta}</Link>

            {/* Mobile hamburger */}
            <button
              className="hide-tablet"
              onClick={() => setMobileOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{ display: 'block', width: '22px', height: '1.5px', background: ink, transition: 'background 0.4s' }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: '#1A1814', paddingTop: '72px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: '40px',
        }}>
          {c.items.map(item => (
            <Link key={item.href} href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '36px', fontWeight: 300, fontStyle: 'italic',
                color: pathname === item.href ? '#C4A882' : '#F5F0E8',
                textDecoration: 'none', letterSpacing: '0.02em',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}
            >
              {item.href === '/preorder' && (
                <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#8B6F47', flexShrink: 0, animation: 'pulse 1.4s ease infinite' }} />
              )}
              {item.label}
            </Link>
          ))}
          <Link href="/build" onClick={() => setMobileOpen(false)} style={{
            marginTop: '16px', fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#1A1814',
            background: '#C4A882', padding: '14px 40px', textDecoration: 'none',
          }}>{c.cta}</Link>
        </div>
      )}
    </>
  );
}
