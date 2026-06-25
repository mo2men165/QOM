'use client';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { useStore } from '@/lib/store';
import { content } from '@/lib/content';
import { products } from '@/lib/data';

const mockMembers = [
  { name: 'Sara M.', nameAr: 'سارة م.', initials: 'SM', status: 'done', items: [products[0], products[2]] },
  { name: 'Ahmed K.', nameAr: 'أحمد خ.', initials: 'AK', status: 'picking', items: [products[4]] },
  { name: 'Nour R.', nameAr: 'نور ر.', initials: 'NR', status: 'done', items: [products[7], products[9]] },
];

export default function GroupInvitePage({ params }: { params: { groupCode: string } }) {
  const { lang } = useStore();
  const c = content[lang].invite;
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const filledCount = mockMembers.reduce((acc, m) => acc + m.items.length, 0);
  const discountPct = Math.min(Math.round((filledCount / 10) * 20), 20);
  const progressPct = (filledCount / 10) * 100;

  return (
    <>
      <Nav />
      <div dir={dir} style={{ background: '#F5F0E8', minHeight: 'calc(100vh - 64px)', padding: '64px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '11px', fontWeight: 400, letterSpacing: '.2em', color: '#8B6F47' }}>{c.eyebrow}</span>

            {/* Invited-by banner */}
            <div style={{ background: '#FFFFFF', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid rgba(26,24,20,.08)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#C4A882', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 500, color: '#FAFAF8' }}>SM</span>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', fontWeight: 400, color: '#1A1814' }}>Sara M. {c.invitedBy}</p>
                <p style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '12px', fontWeight: 300, color: 'rgba(26,24,20,.5)', marginTop: '2px' }}>{c.inviteText}</p>
              </div>
            </div>

            {/* Discount meter */}
            <div style={{ background: '#FFFFFF', padding: '28px', border: '1px solid rgba(26,24,20,.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '12px', color: 'rgba(26,24,20,.5)' }}>{c.discountTitle}</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', fontWeight: 300, color: '#8B6F47', fontStyle: 'italic' }}>{discountPct}%</span>
              </div>
              <div style={{ height: '6px', background: '#F5F0E8', borderRadius: '0', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(to right, #C4A882, #8B6F47)', transition: 'width .5s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '12px', color: 'rgba(26,24,20,.5)' }}>{filledCount} / 10 {c.progress}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8B6F47', animation: 'checkIn .8s ease infinite alternate' }} />
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: '#8B6F47', letterSpacing: '.08em' }}>LIVE</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/build"
              style={{ display: 'block', textAlign: 'center', background: '#1A1814', color: '#FAFAF8', padding: '18px', fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '14px', fontWeight: 500, textDecoration: 'none', letterSpacing: '.04em', transition: 'background .2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#2D2924')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1A1814')}
            >
              {c.cta}
            </Link>
          </div>

          {/* RIGHT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Box preview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '3px' }}>
              {Array.from({ length: 10 }, (_, i) => {
                const allItems = mockMembers.flatMap(m => m.items);
                const prod = allItems[i];
                const isYourSlot = i === filledCount;
                return (
                  <div key={i} style={{ aspectRatio: '2/3', position: 'relative', background: '#E8E4DC', border: isYourSlot ? '2px dashed #8B6F47' : 'none' }}>
                    {prod ? (
                      <>
                        <img src={prod.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px', background: 'rgba(26,24,20,.5)' }}>
                          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', color: 'rgba(245,240,232,.8)', letterSpacing: '.06em' }}>
                            {mockMembers.find(m => m.items.includes(prod))?.initials}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isYourSlot && <span style={{ color: '#8B6F47', fontSize: '16px' }}>+</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Member list */}
            <div style={{ background: '#FFFFFF', padding: '24px', border: '1px solid rgba(26,24,20,.08)' }}>
              <h3 style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '.14em', color: 'rgba(26,24,20,.45)', marginBottom: '16px' }}>{c.membersTitle}</h3>
              {mockMembers.map((m) => (
                <div key={m.initials} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(26,24,20,.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#C4A882', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 500, color: '#FAFAF8' }}>{m.initials}</span>
                    </div>
                    <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', color: '#1A1814' }}>{isAr ? m.nameAr : m.name}</span>
                  </div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: m.status === 'done' ? '#8B6F47' : 'rgba(26,24,20,.4)', letterSpacing: '.06em' }}>
                    {m.status === 'done' ? c.statusDone : c.statusPicking}
                  </span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px dashed #8B6F47', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#8B6F47', fontSize: '16px' }}>+</span>
                  </div>
                  <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', color: 'rgba(26,24,20,.5)' }}>{c.yourSlot}</span>
                </div>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(26,24,20,.35)', letterSpacing: '.06em' }}>{c.pending}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
