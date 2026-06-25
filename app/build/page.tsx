'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { useStore } from '@/lib/store';
import { content } from '@/lib/content';
import { products } from '@/lib/data';

const FILTER_KEYS = ['all', 'tops', 'trousers', 'dresses', 'outerwear'] as const;

export default function BuildPage() {
  const router = useRouter();
  const { lang, step, boxType, selected, filter, setStep, setBoxType, toggleProduct, removeProduct, setFilter } = useStore();
  const c = content[lang].builder;
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const [copied, setCopied] = useState(false);

  const maxPieces = boxType === 'capsule' ? 5 : 10;
  const isFull = selected.length >= maxPieces;

  const filteredProducts = products.filter(p => filter === 'all' || p.filter === filter);

  const tabs = [
    { key: 'all', label: c.step2.tabs.all },
    { key: 'tops', label: c.step2.tabs.tops },
    { key: 'trousers', label: c.step2.tabs.trousers },
    { key: 'dresses', label: c.step2.tabs.dresses },
    { key: 'outerwear', label: c.step2.tabs.outerwear },
  ];

  const stepLabels = c.stepLabels;

  function copyLink() {
    navigator.clipboard.writeText('https://qom.eg/join/ABC123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const selectedProducts = selected.map(id => products.find(p => p.id === id)!).filter(Boolean);
  const slots = Array.from({ length: maxPieces }, (_, i) => selectedProducts[i] || null);

  return (
    <>
      <Nav />

      {/* BREADCRUMB */}
      <div dir={dir} style={{ background: '#FAFAF8', borderBottom: '1px solid rgba(26,24,20,.07)', padding: '0 64px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', height: '52px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: step === s ? '#1A1814' : step > s ? '#8B6F47' : 'transparent', border: `1px solid ${step >= s ? 'transparent' : 'rgba(26,24,20,.25)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 500, color: step >= s ? '#F5F0E8' : 'rgba(26,24,20,.4)' }}>{isAr ? ['١','٢','٣'][i] : s}</span>
                </div>
                <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '11px', fontWeight: 400, color: step === s ? '#1A1814' : 'rgba(26,24,20,.4)', letterSpacing: '.04em' }}>{stepLabels[i]}</span>
              </div>
              {i < 2 && <span style={{ color: 'rgba(26,24,20,.25)', fontSize: '14px' }}>›</span>}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div dir={dir} style={{ background: '#FAFAF8', padding: '80px 64px', minHeight: 'calc(100vh - 116px)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ marginBottom: '56px' }}>
              <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '11px', fontWeight: 400, letterSpacing: '.2em', color: '#8B6F47' }}>{c.step1.eyebrow}</span>
              <h1 style={{ fontFamily: "'Cormorant Garamond','Cairo',serif", fontSize: '52px', fontWeight: 300, color: '#1A1814', fontStyle: 'italic', marginTop: '10px' }}>{c.step1.title}</h1>
              <p style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '14px', fontWeight: 300, color: 'rgba(26,24,20,.5)', marginTop: '12px', maxWidth: '500px', lineHeight: 1.75 }}>{c.step1.sub}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Capsule */}
              <div
                onClick={() => setBoxType('capsule')}
                style={{ background: '#FFFFFF', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', border: '1px solid rgba(26,24,20,.08)', transition: 'transform .25s, box-shadow .25s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 40px rgba(26,24,20,.1)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
              >
                <div style={{ height: '420px', overflow: 'hidden', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&w=900&h=600&fit=crop&q=80" alt="Capsule Box" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .7s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} />
                  <div style={{ position: 'absolute', top: '24px', insetInlineStart: '24px', background: 'rgba(250,250,248,.92)', padding: '6px 14px' }}>
                    <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '.12em', color: '#1A1814' }}>{c.step1.capsule.tag}</span>
                  </div>
                </div>
                <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond','Cairo',serif", fontSize: '32px', fontWeight: 300, color: '#1A1814', fontStyle: 'italic' }}>{c.step1.capsule.name}</h2>
                  <p style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', color: 'rgba(26,24,20,.45)', letterSpacing: '.03em' }}>{c.step1.capsule.pieces}</p>
                  <p style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: 'rgba(26,24,20,.6)', marginTop: '4px' }}>{c.step1.capsule.desc}</p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {c.step1.capsule.perks.map(p => (
                      <span key={p} style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '.1em', color: '#8B6F47', background: '#F5F0E8', padding: '4px 10px' }}>{p}</span>
                    ))}
                  </div>
                  <button style={{ marginTop: '16px', fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '12px', fontWeight: 500, color: '#FAFAF8', background: '#1A1814', border: 'none', padding: '12px 28px', cursor: 'pointer', letterSpacing: '.04em', width: 'fit-content', transition: 'background .2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#2D2924')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#1A1814')}
                  >
                    {c.step1.selectLabel}
                  </button>
                </div>
              </div>

              {/* Group */}
              <div
                onClick={() => setBoxType('group')}
                style={{ background: '#FFFFFF', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', border: '1px solid rgba(26,24,20,.08)', transition: 'transform .25s, box-shadow .25s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 40px rgba(26,24,20,.1)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
              >
                <div style={{ height: '420px', overflow: 'hidden', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&w=900&h=600&fit=crop&q=80" alt="Group Box" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .7s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} />
                  <div style={{ position: 'absolute', top: '24px', insetInlineStart: '24px', background: 'rgba(250,250,248,.92)', padding: '6px 14px' }}>
                    <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '.12em', color: '#1A1814' }}>{c.step1.group.tag}</span>
                  </div>
                  <div style={{ position: 'absolute', top: '24px', insetInlineEnd: '24px', background: '#8B6F47', padding: '6px 14px' }}>
                    <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '.12em', color: '#FAFAF8' }}>{c.step1.group.discount}</span>
                  </div>
                </div>
                <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h2 style={{ fontFamily: "'Cormorant Garamond','Cairo',serif", fontSize: '32px', fontWeight: 300, color: '#1A1814', fontStyle: 'italic' }}>{c.step1.group.name}</h2>
                  <p style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', color: 'rgba(26,24,20,.45)', letterSpacing: '.03em' }}>{c.step1.group.pieces}</p>
                  <p style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: 'rgba(26,24,20,.6)', marginTop: '4px' }}>{c.step1.group.desc}</p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {c.step1.group.perks.map(p => (
                      <span key={p} style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '.1em', color: '#8B6F47', background: '#F5F0E8', padding: '4px 10px' }}>{p}</span>
                    ))}
                  </div>
                  <button style={{ marginTop: '16px', fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '12px', fontWeight: 500, color: '#FAFAF8', background: '#1A1814', border: 'none', padding: '12px 28px', cursor: 'pointer', letterSpacing: '.04em', width: 'fit-content', transition: 'background .2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#2D2924')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#1A1814')}
                  >
                    {c.step1.selectLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div dir={dir} style={{ background: '#FAFAF8', minHeight: 'calc(100vh - 116px)', paddingBottom: '100px' }}>
          {/* Sticky filter bar */}
          <div style={{ position: 'sticky', top: '64px', zIndex: 50, background: '#FAFAF8', borderBottom: '1px solid rgba(26,24,20,.07)', padding: '0 64px' }}>
            <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {tabs.map(t => (
                  <button
                    key={t.key}
                    onClick={() => setFilter(t.key)}
                    style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '12px', fontWeight: filter === t.key ? 500 : 400, color: filter === t.key ? '#F5F0E8' : 'rgba(26,24,20,.5)', background: filter === t.key ? '#1A1814' : 'transparent', border: 'none', padding: '6px 16px', cursor: 'pointer', letterSpacing: '.04em', transition: 'all .2s' }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '12px', color: 'rgba(26,24,20,.45)', letterSpacing: '.04em' }}>
                {selected.length} / {maxPieces} {c.step2.selectedLabel}
              </span>
            </div>
          </div>

          {/* Product grid */}
          <div style={{ padding: '3px 3px', paddingTop: '0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '3px', maxWidth: '100%' }}>
              {filteredProducts.map(p => {
                const isSel = selected.includes(p.id);
                const isDisabled = isFull && !isSel;
                return (
                  <div
                    key={p.id}
                    onClick={() => toggleProduct(p.id)}
                    style={{ cursor: isDisabled ? 'not-allowed' : 'pointer', position: 'relative', background: '#E8E4DC' }}
                  >
                    <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
                      <img src={p.img} alt={isAr ? p.nameAr : p.nameEn} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s ease', opacity: isDisabled ? 0.42 : 1 }}
                        onMouseEnter={(e) => !isDisabled && (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} />
                      {isDisabled && <div style={{ position: 'absolute', inset: 0, background: 'rgba(250,250,248,.5)' }} />}
                      {isSel && (
                        <div className="check-in" style={{ position: 'absolute', top: '12px', insetInlineEnd: '12px', width: '28px', height: '28px', background: '#1A1814', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#FAFAF8', fontSize: '14px' }}>✓</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '12px 14px', border: isSel ? '2px solid #8B6F47' : '2px solid transparent', transition: 'border-color .2s' }}>
                      <p style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '10px', fontWeight: 400, color: '#8B6F47', letterSpacing: '.1em', textTransform: 'uppercase' }}>{isAr ? p.catAr : p.catEn}</p>
                      <p style={{ fontFamily: "'Cormorant Garamond','Cairo',serif", fontSize: '18px', fontWeight: 300, color: '#1A1814', marginTop: '3px' }}>{isAr ? p.nameAr : p.nameEn}</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 300, color: 'rgba(26,24,20,.45)', marginTop: '2px' }}>{p.fabric}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div dir={dir} style={{ background: '#FAFAF8', padding: '64px', minHeight: 'calc(100vh - 116px)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '11px', fontWeight: 400, letterSpacing: '.2em', color: '#8B6F47' }}>{c.step3.eyebrow}</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond','Cairo',serif", fontSize: '48px', fontWeight: 300, color: '#1A1814', fontStyle: 'italic', marginTop: '10px', marginBottom: '40px' }}>{c.step3.title}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${maxPieces}, 1fr)`, gap: '3px', marginBottom: '40px' }}>
              {slots.map((prod, i) => (
                <div key={i} style={{ position: 'relative', aspectRatio: '3/4', background: '#E8E4DC' }}>
                  {prod ? (
                    <>
                      <img src={prod.img} alt={isAr ? prod.nameAr : prod.nameEn} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <button
                        onClick={() => removeProduct(prod.id)}
                        style={{ position: 'absolute', top: '8px', insetInlineEnd: '8px', width: '24px', height: '24px', background: 'rgba(250,250,248,.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#1A1814', lineHeight: 1 }}
                      >×</button>
                    </>
                  ) : (
                    <div style={{ width: '100%', height: '100%', border: '1px dashed rgba(26,24,20,.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px', color: 'rgba(26,24,20,.2)' }}>+</span>
                      <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '10px', color: 'rgba(26,24,20,.3)', letterSpacing: '.1em' }}>{c.step3.emptySlot}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Group share section */}
            {boxType === 'group' && (
              <div style={{ background: '#F5F0E8', padding: '40px', marginBottom: '40px', border: '1px solid rgba(139,111,71,.15)' }}>
                <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '11px', fontWeight: 400, letterSpacing: '.2em', color: '#8B6F47' }}>{c.step3.shareEyebrow}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond','Cairo',serif", fontSize: '28px', fontWeight: 300, color: '#1A1814', fontStyle: 'italic', marginTop: '8px', marginBottom: '8px' }}>{c.step3.shareTitle}</h3>
                <p style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', fontWeight: 300, color: 'rgba(26,24,20,.6)', lineHeight: 1.75, marginBottom: '20px' }}>{c.step3.shareDesc}</p>
                <div style={{ display: 'flex', gap: '0', alignItems: 'stretch' }}>
                  <div style={{ flex: 1, background: '#FAFAF8', border: '1px solid rgba(26,24,20,.15)', padding: '10px 14px', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(26,24,20,.5)' }}>
                    https://qom.eg/join/ABC123
                  </div>
                  <button
                    onClick={copyLink}
                    style={{ background: '#1A1814', color: '#FAFAF8', border: 'none', padding: '10px 20px', fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '12px', fontWeight: 500, cursor: 'pointer', letterSpacing: '.04em', transition: 'background .2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#2D2924')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#1A1814')}
                  >
                    {copied ? '✓' : isAr ? 'نسخ' : 'Copy'}
                  </button>
                </div>
                <p style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '11px', color: 'rgba(26,24,20,.4)', marginTop: '8px' }}>{c.step3.shareHint}</p>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '32px', borderTop: '1px solid rgba(26,24,20,.08)', flexWrap: 'wrap', gap: '16px' }}>
              <button
                onClick={() => setStep(2)}
                style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', fontWeight: 400, color: '#1A1814', background: 'none', border: '1px solid rgba(26,24,20,.2)', padding: '12px 28px', cursor: 'pointer', letterSpacing: '.04em', transition: 'border-color .2s' }}
              >
                {c.step3.editBox}
              </button>
              <Link
                href="/review"
                style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', fontWeight: 500, color: '#FAFAF8', background: '#1A1814', padding: '14px 36px', textDecoration: 'none', letterSpacing: '.04em', transition: 'background .2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#2D2924')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#1A1814')}
              >
                {c.step3.confirm}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* STICKY BOTTOM BAR (step 2) */}
      {step === 2 && (
        <div dir={dir} style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90, background: '#FAFAF8', borderTop: '1px solid rgba(26,24,20,.1)', padding: '0 64px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', boxShadow: '0 -4px 20px rgba(26,24,20,.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {slots.map((prod, i) => (
              <div key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: prod ? '1.5px solid rgba(26,24,20,.2)' : '1.5px dashed rgba(26,24,20,.25)', background: prod ? 'transparent' : '#F5F0E8', flexShrink: 0 }}>
                {prod && <img src={prod.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
            ))}
            <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '12px', color: 'rgba(26,24,20,.5)', marginInlineStart: '8px' }}>
              {selected.length} / {maxPieces}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => setStep(1)}
              style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '12px', fontWeight: 400, color: 'rgba(26,24,20,.5)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '.04em' }}
            >
              {c.step2.back}
            </button>
            <button
              onClick={() => selected.length > 0 && setStep(3)}
              style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', fontWeight: 500, color: '#FAFAF8', background: selected.length > 0 ? '#1A1814' : 'rgba(26,24,20,.3)', border: 'none', padding: '12px 28px', cursor: selected.length > 0 ? 'pointer' : 'not-allowed', letterSpacing: '.04em', transition: 'background .2s' }}
            >
              {c.step2.reviewBox}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
