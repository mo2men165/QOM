'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { products } from '@/lib/data';
import type { PreorderConfig, SSEMoqEvent } from '@/lib/types';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { id: 'natural',  label: 'Natural',  hex: '#E8DFD0' },
  { id: 'sand',     label: 'Sand',     hex: '#C4A882' },
  { id: 'ivory',    label: 'Ivory',    hex: '#F5F0E8' },
  { id: 'charcoal', label: 'Charcoal', hex: '#4A4540' },
  { id: 'navy',     label: 'Navy',     hex: '#1E2D4A' },
  { id: 'olive',    label: 'Olive',    hex: '#5B6340' },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -48px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function formatDeadline(iso: string): string {
  const diff = Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (diff <= 0) return 'Expired';
  if (diff === 1) return '1 day left';
  return `${diff} days left`;
}

function formatPrice(cents: number): string {
  return `EGP ${(cents / 100).toLocaleString('en-EG', { minimumFractionDigits: 0 })}`;
}

interface CommitForm {
  size: string;
  color: string;
  name: string;
  phone: string;
  address: string;
}

export default function PreorderPage() {
  useReveal();

  const [configs, setConfigs] = useState<Record<number, PreorderConfig>>({});
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);

  const [modalProduct, setModalProduct] = useState<number | null>(null);
  const [form, setForm] = useState<CommitForm>({ size: '', color: '', name: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    fetch('/api/preorder/products')
      .then(r => r.json())
      .then((data: PreorderConfig[]) => {
        const map: Record<number, PreorderConfig> = {};
        let total = 0;
        for (const c of data) { map[c.product_id] = c; total += c.current_count; }
        setConfigs(map);
        setTotalOrders(total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const es = new EventSource('/api/preorder/stream');
    es.onmessage = (ev) => {
      try {
        const event: SSEMoqEvent = JSON.parse(ev.data);
        if (event.type === 'moq_update') {
          setConfigs(prev => {
            const old = prev[event.productId]?.current_count ?? 0;
            setTotalOrders(t => t - old + event.currentCount);
            return {
              ...prev,
              [event.productId]: {
                ...prev[event.productId],
                current_count: event.currentCount,
                status: event.status,
              },
            };
          });
        }
      } catch { /* ignore */ }
    };
    return () => es.close();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = useCallback((productId: number) => {
    setModalProduct(productId);
    setForm({ size: '', color: '', name: '', phone: '', address: '' });
    setSubmitError('');
  }, []);

  const closeModal = useCallback(() => {
    setModalProduct(null);
    setSubmitting(false);
    setSubmitError('');
  }, []);

  async function handleCommit() {
    if (!modalProduct) return;
    if (!form.size)         return setSubmitError('Please select a size');
    if (!form.color)        return setSubmitError('Please select a colour');
    if (!form.name.trim())  return setSubmitError('Please enter your name');
    if (!form.phone.trim()) return setSubmitError('Please enter your phone number');
    if (!form.address.trim()) return setSubmitError('Please enter your delivery address');

    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/preorder/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: modalProduct,
          size: form.size,
          color: form.color,
          customerName: form.name,
          phone: form.phone,
          address: form.address,
        }),
      });
      const data = await res.json() as { paymentUrl?: string; error?: string };
      if (!res.ok || !data.paymentUrl) throw new Error(data.error ?? 'Unknown error');
      window.location.href = data.paymentUrl;
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : String(err));
      setSubmitting(false);
    }
  }

  const preorderProducts = products.filter(p => configs[p.id]);

  return (
    <>
      <Nav />

      {/* ── Hero ────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '68vh', overflow: 'hidden', minHeight: '520px' }}>
        <img src="/qom/2.png" alt="Community Pre-Order"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(26,24,20,0.82) 0%, rgba(26,24,20,0.5) 100%)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '64px 64px 72px', maxWidth: '1440px' }}>
          <span className="eyebrow eyebrow-light" style={{ marginBottom: '18px' }}>Community Pre-Order</span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(52px, 7vw, 88px)',
            fontWeight: 300, fontStyle: 'italic',
            lineHeight: 0.95, color: '#F5F0E8',
            maxWidth: '640px',
          }}>Back it.<br />Build it.<br />Wear it.</h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300,
            color: 'rgba(245,240,232,0.5)', marginTop: '24px', maxWidth: '380px', lineHeight: 1.85,
          }}>
            Commit to a piece before it's made. If the community hits the target, it goes into production. If not — full refund, automatically.
          </p>
        </div>

        {/* Live community counter */}
        {totalOrders > 0 && (
          <div style={{
            position: 'absolute', top: '104px', right: '64px',
            background: 'rgba(26,24,20,0.72)', backdropFilter: 'blur(12px)',
            padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#8B6F47', animation: 'pulse 1.4s ease infinite' }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)' }}>Live</span>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', fontWeight: 300, fontStyle: 'italic', color: '#F5F0E8', lineHeight: 1 }}>{totalOrders.toLocaleString()}</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)' }}>Community Orders</span>
          </div>
        )}
      </section>

      {/* ── How it works strip ──────────────────────────── */}
      <div style={{ background: '#1A1814' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: 'rgba(196,168,130,0.1)' }}>
          {[
            { n: '01', t: 'Commit & Pay', b: 'Select your piece, size, and colour. Pay now securely through Paymob.' },
            { n: '02', t: 'Watch It Fill', b: 'The MOQ counter updates live as the community backs it in real time.' },
            { n: '03', t: 'Ships or Refunds', b: 'Goal met → factory production begins. Goal missed → automatic full refund.' },
          ].map(step => (
            <div key={step.n} style={{ background: '#1A1814', padding: '36px 48px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '48px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(196,168,130,0.22)', lineHeight: 0.9, flexShrink: 0 }}>{step.n}</span>
              <div style={{ paddingTop: '6px' }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em', color: '#F5F0E8', marginBottom: '8px' }}>{step.t}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 300, lineHeight: 1.7, color: 'rgba(245,240,232,0.4)' }}>{step.b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Product grid ────────────────────────────────── */}
      <section style={{ background: '#FAFAF8', padding: loading ? '120px 64px' : '3px' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: '#8B6F47', animation: 'pulse 1.2s ease infinite' }} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(26,24,20,0.35)', letterSpacing: '0.1em' }}>LOADING</span>
          </div>
        ) : preorderProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '120px 64px' }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(26,24,20,0.35)' }}>No active pre-orders right now.</p>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(26,24,20,0.3)', marginTop: '12px' }}>Check back soon — new drops are added each season.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3px' }}>
            {preorderProducts.map((product, i) => {
              const cfg = configs[product.id];
              if (!cfg) return null;
              const pct = Math.min((cfg.current_count / cfg.moq) * 100, 100);
              const isFunded  = cfg.status === 'funded';
              const isExpired = cfg.status === 'expired';
              const isOpen    = cfg.status === 'open';
              const daysLeft  = Math.ceil((new Date(cfg.deadline).getTime() - Date.now()) / 86_400_000);
              const isUrgent  = isOpen && daysLeft <= 7;

              return (
                <div key={product.id}
                  style={{ background: '#FFFFFF', overflow: 'hidden', display: 'grid', gridTemplateColumns: '42% 1fr' }}>

                  {/* Image */}
                  <div className="img-zoom" style={{ position: 'relative', overflow: 'hidden', background: '#E8E4DC', minHeight: '500px' }}>
                    <img src={product.img} alt={product.nameEn}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                    {/* Status badge */}
                    <div style={{
                      position: 'absolute', top: '20px', left: '20px',
                      background: isFunded ? '#8B6F47' : isExpired ? 'rgba(26,24,20,0.65)' : 'rgba(250,250,248,0.94)',
                      padding: '5px 14px',
                    }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: isFunded || isExpired ? '#F5F0E8' : '#1A1814' }}>
                        {isFunded ? 'Funded' : isExpired ? 'Closed' : 'Live'}
                      </span>
                    </div>
                    {/* Urgency badge */}
                    {isUrgent && (
                      <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: '#C4A882', animation: 'pulse 1s ease infinite' }} />
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', color: '#F5F0E8', textTransform: 'uppercase', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                          {daysLeft === 1 ? 'Last day' : `${daysLeft} days left`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info panel */}
                  <div style={{ padding: '44px 48px', display: 'flex', flexDirection: 'column', gap: '0' }}>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8B6F47', marginBottom: '10px' }}>
                      {product.catEn}
                    </span>
                    <h2 style={{
                      fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(26px, 2.4vw, 36px)',
                      fontWeight: 300, fontStyle: 'italic', color: '#1A1814', lineHeight: 1.05, marginBottom: '6px',
                    }}>
                      {product.nameEn}
                    </h2>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 300, color: 'rgba(26,24,20,0.4)', marginBottom: '32px' }}>
                      {product.fabric}
                    </p>

                    {/* Price */}
                    <div style={{ marginBottom: '36px' }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(26,24,20,0.35)', display: 'block', marginBottom: '6px' }}>Pre-order price</span>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '40px', fontWeight: 300, fontStyle: 'italic', color: '#1A1814', lineHeight: 1 }}>
                        {formatPrice(cfg.price_cents)}
                      </span>
                    </div>

                    {/* MOQ Progress block */}
                    <div style={{ marginBottom: '36px' }}>
                      {/* Count row */}
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                          {isOpen && (
                            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#8B6F47', animation: 'pulse 1.4s ease infinite', flexShrink: 0, marginBottom: '2px' }} />
                          )}
                          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', fontWeight: 300, fontStyle: 'italic', color: '#1A1814', lineHeight: 1 }}>
                            {cfg.current_count.toLocaleString()}
                          </span>
                          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(26,24,20,0.4)' }}>
                            of {cfg.moq.toLocaleString()} ordered
                          </span>
                        </div>
                        <span style={{
                          fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 500,
                          color: isFunded ? '#8B6F47' : isExpired ? 'rgba(26,24,20,0.3)' : '#1A1814',
                        }}>
                          {Math.round(pct)}%
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div style={{ height: '3px', background: '#F0ECE4', overflow: 'hidden', marginBottom: '10px' }}>
                        <div style={{
                          height: '100%', width: `${pct}%`,
                          background: isFunded
                            ? '#8B6F47'
                            : isExpired
                            ? 'rgba(26,24,20,0.2)'
                            : 'linear-gradient(90deg, #C4A882 0%, #8B6F47 100%)',
                          transition: 'width 0.8s ease',
                        }} />
                      </div>

                      {/* Deadline + percentage row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: 'rgba(26,24,20,0.35)' }}>
                          {isFunded ? 'Funded — In Production' : isExpired ? 'Pre-order closed' : `Closes: ${formatDeadline(cfg.deadline)}`}
                        </span>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: 'rgba(26,24,20,0.35)' }}>
                          {cfg.moq - cfg.current_count > 0 && isOpen ? `${(cfg.moq - cfg.current_count).toLocaleString()} still needed` : ''}
                        </span>
                      </div>
                    </div>

                    {/* What happens strip */}
                    <div style={{
                      background: '#F5F0E8', padding: '14px 18px', marginBottom: '28px',
                      borderLeft: '2px solid #C4A882',
                    }}>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 300, lineHeight: 1.7, color: 'rgba(26,24,20,0.6)' }}>
                        {isFunded
                          ? 'This batch is fully funded. Production has started — you will be notified when it ships.'
                          : isExpired
                          ? 'This batch has closed. All orders in this batch have been automatically refunded.'
                          : 'Pay now to secure your place. If the goal is not met before the deadline, you will receive a full automatic refund.'}
                      </p>
                    </div>

                    {/* CTA */}
                    <button
                      disabled={!isOpen}
                      onClick={() => isOpen && openModal(product.id)}
                      style={{
                        fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 500,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: isOpen ? '#FAFAF8' : 'rgba(26,24,20,0.3)',
                        background: isOpen ? '#1A1814' : '#ECEAE5',
                        border: 'none', padding: '16px 32px',
                        cursor: isOpen ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s',
                        marginTop: 'auto',
                      }}
                      onMouseEnter={e => isOpen && (e.currentTarget.style.background = '#2D2924')}
                      onMouseLeave={e => isOpen && (e.currentTarget.style.background = '#1A1814')}
                    >
                      {isFunded ? 'Funded — In Production' : isExpired ? 'Pre-Order Closed' : 'Reserve My Piece'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Trust strip ─────────────────────────────────── */}
      <section style={{ background: '#F5F0E8', borderTop: '1px solid rgba(26,24,20,0.07)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px' }}>
          {[
            { icon: '◎', t: 'Paymob-Secured', b: 'Every payment goes through Paymob — Egypt\'s trusted payment gateway.' },
            { icon: '◈', t: 'Automatic Refunds', b: 'If the MOQ deadline passes, your money is returned automatically. No requests needed.' },
            { icon: '◉', t: 'Export Quality', b: 'Every piece that goes into production is certified export-grade from our factory network.' },
          ].map(item => (
            <div key={item.t} style={{ padding: '32px 40px 32px 0', display: 'flex', gap: '16px' }}>
              <span style={{ fontSize: '18px', color: '#C4A882', flexShrink: 0 }}>{item.icon}</span>
              <div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 500, color: '#1A1814', marginBottom: '6px' }}>{item.t}</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 300, lineHeight: 1.7, color: 'rgba(26,24,20,0.5)' }}>{item.b}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA band ────────────────────────────────────── */}
      <section style={{ background: '#1A1814', padding: '80px 64px', textAlign: 'center' }}>
        <span className="eyebrow eyebrow-light reveal" style={{ marginBottom: '16px' }}>All Products</span>
        <h2 className="reveal d1" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(30px, 3.5vw, 48px)',
          fontWeight: 300, fontStyle: 'italic',
          color: '#F5F0E8', lineHeight: 1.1, marginBottom: '32px',
        }}>Or Build Your Box Instead</h2>
        <div className="reveal d2" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/season" style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#1A1814', background: '#C4A882', border: '1px solid #C4A882',
            padding: '14px 40px', textDecoration: 'none', transition: 'background 0.25s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#D4B892')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C4A882')}
          >Browse This Season</Link>
          <Link href="/build" className="btn-outline">Build Your Box</Link>
        </div>
      </section>

      <Footer />

      {/* ── Commit modal ────────────────────────────────── */}
      {modalProduct !== null && (() => {
        const product = products.find(p => p.id === modalProduct)!;
        const cfg = configs[modalProduct];
        return (
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(26,24,20,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
            onClick={e => e.target === e.currentTarget && closeModal()}
          >
            <div style={{ background: '#FAFAF8', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              {/* Modal header */}
              <div style={{ padding: '32px 36px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8B6F47', display: 'block', marginBottom: '6px' }}>
                    {product.catEn}
                  </span>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 300, fontStyle: 'italic', color: '#1A1814', lineHeight: 1.1 }}>
                    {product.nameEn}
                  </h2>
                  {cfg && (
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 300, fontStyle: 'italic', color: '#8B6F47', marginTop: '4px' }}>
                      {formatPrice(cfg.price_cents)}
                    </p>
                  )}
                </div>
                <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', color: 'rgba(26,24,20,0.3)', padding: '0', lineHeight: 1, marginTop: '4px' }}>×</button>
              </div>

              <div style={{ padding: '28px 36px 36px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {/* Size */}
                <div>
                  <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(26,24,20,0.45)', display: 'block', marginBottom: '10px' }}>
                    Size
                  </label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {SIZES.map(size => (
                      <button key={size} onClick={() => setForm(f => ({ ...f, size }))} style={{
                        fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 400,
                        color: form.size === size ? '#FAFAF8' : '#1A1814',
                        background: form.size === size ? '#1A1814' : 'transparent',
                        border: `1px solid ${form.size === size ? '#1A1814' : 'rgba(26,24,20,0.18)'}`,
                        padding: '8px 18px', cursor: 'pointer', transition: 'all 0.15s',
                      }}>{size}</button>
                    ))}
                  </div>
                </div>

                {/* Colour */}
                <div>
                  <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(26,24,20,0.45)', display: 'block', marginBottom: '10px' }}>
                    Colour
                  </label>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {COLORS.map(c => (
                      <button key={c.id} onClick={() => setForm(f => ({ ...f, color: c.id }))} title={c.label} style={{
                        width: '36px', height: '36px', background: c.hex, cursor: 'pointer',
                        border: '2px solid transparent',
                        outline: form.color === c.id ? '2px solid #8B6F47' : 'none',
                        outlineOffset: '2px',
                        transition: 'outline 0.15s',
                      }} />
                    ))}
                  </div>
                  {form.color && (
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(26,24,20,0.4)', marginTop: '8px' }}>
                      {COLORS.find(c => c.id === form.color)?.label}
                    </p>
                  )}
                </div>

                <div style={{ height: '1px', background: 'rgba(26,24,20,0.08)' }} />

                {/* Contact fields */}
                {([
                  { key: 'name' as const,    label: 'Full Name',         type: 'text' },
                  { key: 'phone' as const,   label: 'Phone Number',      type: 'tel' },
                  { key: 'address' as const, label: 'Delivery Address',  type: 'text' },
                ]).map(field => (
                  <div key={field.key}>
                    <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(26,24,20,0.45)', display: 'block', marginBottom: '8px' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={form[field.key]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      style={{
                        width: '100%', border: '1px solid rgba(26,24,20,0.14)',
                        background: '#FFFFFF', padding: '11px 14px',
                        fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 300,
                        color: '#1A1814', outline: 'none', boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(26,24,20,0.4)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(26,24,20,0.14)')}
                    />
                  </div>
                ))}

                {/* Error */}
                {submitError && (
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: '#B44', margin: 0, lineHeight: 1.5 }}>{submitError}</p>
                )}

                {/* Payment note */}
                <div style={{ background: '#F5F0E8', padding: '12px 16px', borderLeft: '2px solid #C4A882' }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 300, color: 'rgba(26,24,20,0.55)', lineHeight: 1.7, margin: 0 }}>
                    You will be redirected to Paymob to complete payment. Your order remains pending until the MOQ is reached. If the goal is not met, you receive a full automatic refund.
                  </p>
                </div>

                {/* Submit */}
                <button
                  onClick={handleCommit}
                  disabled={submitting}
                  style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 500,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#FAFAF8', background: submitting ? 'rgba(26,24,20,0.35)' : '#1A1814',
                    border: 'none', padding: '16px', cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => !submitting && (e.currentTarget.style.background = '#2D2924')}
                  onMouseLeave={e => !submitting && (e.currentTarget.style.background = '#1A1814')}
                >
                  {submitting ? 'Processing…' : 'Confirm & Pay'}
                </button>

                <button onClick={closeModal} style={{ background: 'none', border: 'none', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(26,24,20,0.35)', cursor: 'pointer', padding: '4px', textAlign: 'center', letterSpacing: '0.06em' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
