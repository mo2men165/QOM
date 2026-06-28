'use client';
import Link from 'next/link';
import { useResponsive } from '@/lib/responsive';

const cols = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', href: '/season' },
      { label: 'This Season', href: '/season' },
      { label: 'Build a Box', href: '/build' },
      { label: 'Group Buying', href: '/how-it-works' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About QOM', href: '/about' },
      { label: 'Our Factories', href: '/about' },
      { label: 'Transparency', href: '/about' },
      { label: 'Journal', href: '#' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Shipping & Delivery', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
];

export default function Footer() {
  const { isMobile, isTablet } = useResponsive();

  const gridCols = isMobile ? '1fr' : isTablet ? '1fr 1fr' : '2fr 1fr 1fr 1fr';
  const px = isMobile ? '24px' : isTablet ? '40px' : '64px';

  return (
    <footer style={{ background: '#1A1814', color: '#F5F0E8' }}>
      {/* Main footer body */}
      <div style={{ padding: `${isMobile ? '48px' : '72px'} ${px} ${isMobile ? '40px' : '56px'}`, maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: isMobile ? '36px' : '48px', alignItems: 'start' }}>
          {/* Brand column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Link href="/" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '32px', fontWeight: 300, fontStyle: 'italic',
              letterSpacing: '0.18em', color: '#F5F0E8', textDecoration: 'none',
            }}>QOM</Link>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: '13px',
              fontWeight: 300, lineHeight: 1.8,
              color: 'rgba(245,240,232,0.4)', maxWidth: '260px',
            }}>
              Egypt's first group buying fashion brand. Export-quality clothing, factory-direct prices — built together.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              {['Instagram', 'TikTok', 'Facebook'].map(s => (
                <a key={s} href="#" style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: '10px',
                  fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.35)', textDecoration: 'none',
                  transition: 'color 0.25s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C4A882')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.35)')}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Nav columns — on mobile show as 2-column sub-grid */}
          {isMobile ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
              {cols.map(col => (
                <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: '9px',
                    fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'rgba(196,168,130,0.5)', marginBottom: '4px', display: 'block',
                  }}>{col.title}</span>
                  {col.links.map(link => (
                    <Link key={link.label} href={link.href} style={{
                      fontFamily: "'DM Sans',sans-serif", fontSize: '13px',
                      fontWeight: 300, color: 'rgba(245,240,232,0.4)',
                      textDecoration: 'none', transition: 'color 0.25s',
                      letterSpacing: '0.02em',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.8)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.4)')}
                    >{link.label}</Link>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            cols.map(col => (
              <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: '9px',
                  fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(196,168,130,0.5)', marginBottom: '4px', display: 'block',
                }}>{col.title}</span>
                {col.links.map(link => (
                  <Link key={link.label} href={link.href} style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: '13px',
                    fontWeight: 300, color: 'rgba(245,240,232,0.4)',
                    textDecoration: 'none', transition: 'color 0.25s',
                    letterSpacing: '0.02em',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.8)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.4)')}
                  >{link.label}</Link>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(245,240,232,0.07)', padding: `${isMobile ? '20px' : '24px'} ${px}`, maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: '11px',
            fontWeight: 300, color: 'rgba(245,240,232,0.2)',
            letterSpacing: '0.04em',
          }}>© 2025 QOM — All rights reserved</p>
          {!isMobile && (
            <p style={{
              fontFamily: "'Cormorant Garamond',serif", fontSize: '15px',
              fontWeight: 300, fontStyle: 'italic',
              color: 'rgba(196,168,130,0.35)',
            }}>Made in Egypt. Designed for the World.</p>
          )}
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms', 'FAQ'].map(l => (
              <a key={l} href="#" style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: '11px',
                fontWeight: 300, letterSpacing: '0.04em',
                color: 'rgba(245,240,232,0.2)', textDecoration: 'none',
                transition: 'color 0.25s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.2)')}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
