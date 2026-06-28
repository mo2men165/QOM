'use client';
import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useStore } from '@/lib/store';
import { content } from '@/lib/content';
import { products } from '@/lib/data';
import { useResponsive } from '@/lib/responsive';

export default function ReviewPage() {
  const { lang, boxType, selected, removeProduct } = useStore();
  const c = content[lang].review;
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const { isMobile, isTablet } = useResponsive();
  const px = isMobile ? '16px' : isTablet ? '32px' : '64px';

  const maxPieces = boxType === 'capsule' ? 5 : 10;
  const selectedProducts = selected.map(id => products.find(p => p.id === id)!).filter(Boolean);
  const slots = Array.from({ length: maxPieces }, (_, i) => selectedProducts[i] || null);

  const price = boxType === 'group' ? c.summary.groupPrice : c.summary.capsulePrice;
  const boxLabel = boxType === 'group' ? c.summary.group : c.summary.capsule;

  // On mobile, show slots in a 3-col grid
  const itemGridCols = isMobile ? 'repeat(3, 1fr)' : `repeat(${maxPieces}, 1fr)`;

  return (
    <>
      <Nav />

      <div dir={dir} style={{ background: '#FAFAF8', padding: `${isMobile ? '40px' : '80px'} ${px}`, minHeight: 'calc(100vh - 64px)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.75fr', gap: isMobile ? '40px' : '64px', alignItems: 'start' }}>
          {/* Left column */}
          <div>
            <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '11px', fontWeight: 400, letterSpacing: '.2em', color: '#8B6F47' }}>{c.eyebrow}</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond','Cairo',serif", fontSize: isMobile ? '32px' : '48px', fontWeight: 300, color: '#1A1814', fontStyle: 'italic', marginTop: '10px', marginBottom: '4px' }}>{c.title}</h1>
            <p style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', color: 'rgba(26,24,20,.45)', letterSpacing: '.04em', marginBottom: '32px' }}>{boxLabel}</p>

            {/* Item grid */}
            <div style={{ display: 'grid', gridTemplateColumns: itemGridCols, gap: '3px', marginBottom: '24px' }}>
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
                    <div style={{ width: '100%', height: '100%', border: '1px dashed rgba(26,24,20,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'rgba(26,24,20,.2)', fontSize: '11px', fontFamily: "'DM Sans',sans-serif" }}>{c.emptySlot}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Link href="/build" style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '12px', fontWeight: 400, color: 'rgba(26,24,20,.5)', textDecoration: 'none', borderBottom: '1px solid rgba(26,24,20,.2)', paddingBottom: '2px', letterSpacing: '.04em' }}>
              {c.editLink}
            </Link>

            {/* Pricing strip */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '0', marginTop: '40px', border: '1px solid rgba(26,24,20,.08)' }}>
              {c.pricing.map((item, i) => (
                <div key={i} style={{ padding: '20px 24px', borderBottom: isMobile && i < c.pricing.length - 1 ? '1px solid rgba(26,24,20,.08)' : 'none', borderRight: !isMobile && i < c.pricing.length - 1 ? '1px solid rgba(26,24,20,.08)' : 'none', textAlign: 'center', display: 'flex', flexDirection: isMobile ? 'row' : 'column', justifyContent: isMobile ? 'space-between' : 'center', alignItems: isMobile ? 'center' : 'center' }}>
                  <div style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '10px', fontWeight: 400, color: 'rgba(26,24,20,.45)', letterSpacing: '.1em' }}>{item.label}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 300, color: '#8B6F47', fontStyle: 'italic', marginTop: isMobile ? 0 : '4px' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ position: isMobile ? 'static' : 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Order summary */}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(26,24,20,.08)', padding: '28px' }}>
              <h3 style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '.14em', color: 'rgba(26,24,20,.5)', marginBottom: '20px' }}>{c.summary.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', fontWeight: 300, color: 'rgba(26,24,20,.6)' }}>{c.summary.subtotal}</span>
                <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', fontWeight: 400, color: '#1A1814' }}>{price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(26,24,20,.08)' }}>
                <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', fontWeight: 300, color: 'rgba(26,24,20,.6)' }}>{c.summary.shipping}</span>
                <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', fontWeight: 400, color: '#8B6F47' }}>{c.summary.shippingFree}</span>
              </div>
              {boxType === 'group' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#F5F0E8', border: '1px solid rgba(139,111,71,.15)', marginBottom: '16px' }}>
                  <span style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '12px', color: 'rgba(26,24,20,.6)' }}>{c.summary.groupDiscount}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', fontWeight: 300, color: '#8B6F47', fontStyle: 'italic' }}>{c.summary.groupDiscountVal}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: "'Cormorant Garamond','Cairo',serif", fontSize: '22px', fontWeight: 300, color: '#1A1814', fontStyle: 'italic' }}>{c.summary.total}</span>
                <span style={{ fontFamily: "'Cormorant Garamond','Cairo',serif", fontSize: '26px', fontWeight: 300, color: '#1A1814', fontStyle: 'italic' }}>{price}</span>
              </div>
            </div>

            {/* Delivery form */}
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(26,24,20,.08)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { key: 'name', placeholder: c.form.name },
                { key: 'phone', placeholder: c.form.phone },
                { key: 'address', placeholder: c.form.address },
              ].map(field => (
                <input
                  key={field.key}
                  type={field.key === 'phone' ? 'tel' : 'text'}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  dir={dir}
                  style={{ width: '100%', border: '1px solid rgba(26,24,20,.15)', background: '#FAFAF8', padding: '11px 14px', fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '13px', fontWeight: 300, color: '#1A1814', outline: 'none' }}
                />
              ))}
            </div>

            <button
              style={{ width: '100%', background: '#1A1814', color: '#FAFAF8', border: 'none', padding: '16px', fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '14px', fontWeight: 500, cursor: 'pointer', letterSpacing: '.04em', transition: 'background .2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#2D2924')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1A1814')}
            >
              {c.form.confirm}
            </button>
            <p style={{ fontFamily: "'DM Sans','Cairo',sans-serif", fontSize: '11px', color: 'rgba(26,24,20,.4)', textAlign: 'center', lineHeight: 1.6 }}>{c.form.hint}</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
