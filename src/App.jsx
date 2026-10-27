import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Copy, Flower2, Gift, Heart, Mail, Menu, MessageCircle, Music2, Play, Plus, ShieldCheck, Sparkles, Video, X } from 'lucide-react';
import { CATALOG_CONFIG as config, createOrderMessage, formatPrice, getOrder, getWhatsAppUrl } from './catalog.js';

const addonIcons = [Mail, Heart, Music2, Gift, Video];

export default function App() {
  const [productId, setProductId] = useState('anniversary');
  const [selectedIds, setSelectedIds] = useState([]);
  const [notes, setNotes] = useState('');
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [message, setMessage] = useState('');
  const dialogRef = useRef(null);
  const order = getOrder(productId, selectedIds);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (message && !dialogRef.current.open) dialogRef.current.showModal();
  }, [message]);

  async function copy(text, success = 'Berhasil disalin. Siap dikirim!') {
    try {
      await navigator.clipboard.writeText(text);
      setToast(success);
    } catch {
      setToast('Belum bisa menyalin otomatis. Pilih teks dan salin secara manual, ya.');
    }
  }

  function contact(text = 'Halo Knzy Studio! Aku mau konsultasi hadiah website 💌') {
    const url = getWhatsAppUrl(text);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    else setMessage(text);
  }

  function chooseProduct(id) {
    setProductId(id);
    document.getElementById('personalisasi').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  function toggleAddon(id) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function closeDialog() {
    dialogRef.current.close();
    setMessage('');
  }

  return (
    <>
      <a className="skip-link" href="#main">Langsung ke konten</a>
      <header className="site-header">
        <div className="nav-wrap">
          <a href="#" className="brand" aria-label="Knzy Studio, beranda">Knzy<span>STUDIO</span><span className="brand-dot">✳</span></a>
          <nav aria-label="Navigasi utama" className={menuOpen ? 'navigation is-open' : 'navigation'}>
            {[['katalog', 'Katalog'], ['personalisasi', 'Personalisasi'], ['cara-pesan', 'Cara pesan'], ['faq', 'FAQ']].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <button className="button button-small nav-chat" onClick={() => contact()}><MessageCircle size={14} /> Yuk, ngobrol</button>
          <button className="menu-toggle icon-button" aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main id="main" className="page-wrap">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <button className="announcement" onClick={() => { setOpened(true); setToast('Psst… ada pesan kecil buat kamu di kartu hadiah 💌'); }}><span className="status-dot" /> Hadiah kecil, rasa yang besar <Sparkles size={12} /></button>
            <h1 id="hero-title">Kasih ucapan yang<br />tidak cuma <em>di-chat.</em></h1>
            <p>Ubah foto, cerita, dan perasaanmu jadi hadiah website personal. Untuk pasangan, sahabat, atau siapa pun yang bikin harimu lebih berarti.</p>
            <div className="hero-actions">
              <a className="button" href="#katalog">Pilih hadiahmu <ArrowUpRight size={16} /></a>
              <button className="button button-outline" onClick={() => contact()}><MessageCircle size={16} /> Ngobrol dulu aja</button>
            </div>
            <div className="hero-footnote"><Heart size={13} /> Dibuat dengan hati. Dikirim lewat satu link.</div>
          </div>
          <div className="hero-art">
            <span className="floating-spark spark-one" aria-hidden="true">✧</span>
            <span className="floating-spark spark-two" aria-hidden="true">✳</span>
            <span className="art-note">a little love, just for you <span aria-hidden="true">↴</span></span>
            <div className={`gift-arch ${opened ? 'gift-open' : ''}`}>
              <div className="arch-inner">
                <div className="gift-eyebrow">A GIFT FOR YOU</div>
                <Heart className="arch-heart" size={25} strokeWidth={1} />
                <span className="gift-script">{opened ? 'dear, you.' : 'always,'}</span>
                <span className="gift-subtitle">{opened ? 'you make ordinary days feel special.' : 'you & me.'}</span>
                <div className="gift-divider"><span /><Flower2 size={15} /><span /></div>
                <p>{opened ? 'Terima kasih sudah hadir. Dunia terasa sedikit lebih hangat sejak ada kamu di dalamnya.' : 'Beberapa orang membuat dunia terasa lebih indah. Kamu salah satunya.'}</p>
                <button className="gift-open-button" onClick={() => setOpened(!opened)}>{opened ? <Heart size={13} /> : <Mail size={13} />} {opened ? 'Simpan di hati' : 'Buka pesan kecilmu'} <ArrowRight size={12} /></button>
                <div className="gift-tags"><span>our story</span><span>little moments</span><span>forever us</span></div>
              </div>
            </div>
            <div className="art-caption"><span className="caption-line" /> bukan sekadar link, ini tentang rasa.</div>
          </div>
        </section>

        <div className="promise-strip"><span>PERSONAL & PENUH MAKNA</span><span>Untuk momen yang ingin <em>diingat selamanya.</em></span><Heart size={16} strokeWidth={1.2} /></div>

        <section id="katalog" className="section catalog-section" aria-labelledby="catalog-title">
          <div className="section-heading">
            <div><p className="eyebrow"><span /> THE LITTLE GIFT SHOP</p><h2 id="catalog-title">Pilih dulu yang paling <em>kamu.</em></h2></div>
            <p>Setiap cerita punya caranya sendiri untuk dirayakan.<br />Mulai dari sini, lalu tambahkan sentuhan personalmu.</p>
          </div>
          <div className="product-grid">
            {config.products.map((product, index) => (
              <article className={`product-card product-${product.id}`} key={product.id}>
                <div className="product-art">
                  {index === 0 && <span className="popular-label"><Heart size={9} fill="currentColor" /> Favorit untuk si dia</span>}
                  <div className="product-art-frame">
                    {index === 0 ? <Heart size={28} strokeWidth={1} /> : index === 1 ? <Gift size={28} strokeWidth={1} /> : <Flower2 size={29} strokeWidth={1} />}
                    <span>{index === 0 ? 'happy anniversary' : index === 1 ? 'happy birthday' : 'just for you'}</span>
                    <small>{index === 0 ? 'a little page of our love' : index === 1 ? 'make a wish, my favorite human' : 'your idea, a little magic'}</small>
                    <div className="preview-pill">{index === 2 ? 'made with love' : 'a gift to remember'}</div>
                  </div>
                </div>
                <div className="product-body">
                  <div className="product-title"><h3>{product.name}</h3><span>{index === 2 && <small>mulai </small>}{formatPrice(product.price)}</span></div>
                  <p className="product-description">{product.description}</p>
                  <ul className="feature-list">{product.features.map((feature) => <li key={feature}><Check size={12} />{feature}</li>)}</ul>
                  {index === 0 && <div className="pin-note"><div><small>PIN UNTUK DEMO</small><span>{config.anniversaryPin || 'Minta PIN lewat chat'}</span></div><button onClick={() => config.anniversaryPin ? copy(config.anniversaryPin, 'PIN demo berhasil disalin!') : contact('Halo Knzy Studio! Boleh minta PIN demo Anniversary?')}><Copy size={12} />{config.anniversaryPin ? 'Salin PIN' : 'Minta PIN'}</button></div>}
                  {index === 2 && <div className="custom-note"><Sparkles size={13} /> Punya referensi? Bawa aja, kita obrolin.</div>}
                  <div className="product-actions">{product.demo && <a className="button button-outline" href={product.demo} target="_blank" rel="noreferrer"><Play size={12} /> Lihat demo <ArrowUpRight size={12} /></a>}<button className="button" onClick={() => chooseProduct(product.id)}>{index === 2 ? 'Racik hadiahmu' : 'Pesan paket ini'}<ArrowRight size={13} /></button></div>
                </div>
              </article>
            ))}
          </div>
          <p className="catalog-footnote"><ShieldCheck size={13} /> Foto dan ceritamu, untuk hadiah personalmu. Detail pengerjaan dikonfirmasi sebelum pembayaran.</p>
        </section>

        <section id="personalisasi" className="section" aria-labelledby="customize-title">
          <div className="section-heading"><div><p className="eyebrow"><span /> MAKE IT MORE YOU</p><h2 id="customize-title">Tambah sentuhan, lihat <em>harganya.</em></h2></div><span className="little-note">a little extra love goes a long way ♡</span></div>
          <div className="calculator-grid">
            <div className="options-panel">
              <fieldset className="package-field"><legend><span>01</span> PILIH PAKET DASAR</legend><div className="package-options">{config.products.map((product) => <label key={product.id} className={productId === product.id ? 'package-option selected' : 'package-option'}><input type="radio" name="package" value={product.id} checked={productId === product.id} onChange={() => setProductId(product.id)} /><span>{product.shortName}</span><small>{formatPrice(product.price)}</small>{productId === product.id && <Check size={12} />}</label>)}</div></fieldset>
              <fieldset className="addon-field"><legend><span>02</span> TAMBAH SEDIKIT MAGIC <small>opsional</small></legend><div className="addon-list">{config.addons.map((addon, index) => { const Icon = addonIcons[index]; const included = addon.includedIn.includes(productId); return <label key={addon.id} className={`addon-row ${included ? 'included' : ''}`}><input type="checkbox" checked={included || selectedIds.includes(addon.id)} disabled={included} onChange={() => toggleAddon(addon.id)} /><Icon size={16} strokeWidth={1.4} /><span className="addon-copy"><span>{addon.name}</span><small>{addon.description}</small></span><span className="addon-price">{included ? 'Sudah termasuk' : `+${formatPrice(addon.price)}`}</span></label>; })}</div></fieldset>
              <label className="notes-label" htmlFor="notes"><span>03</span> ADA CERITA ATAU REFERENSI? <small>opsional</small></label>
              <textarea id="notes" value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={1500} placeholder="Misal: buat anniversary ke-2, temanya pink. Referensi: https://…" rows={2} />
            </div>
            <aside className="order-summary" aria-labelledby="summary-title">
              <div className="summary-heading"><span className="eyebrow" id="summary-title">HADIAH PILIHANMU</span><Mail size={19} strokeWidth={1.2} /></div>
              <div className="summary-product"><span>{order.product.name}</span><span>{formatPrice(order.product.price)}</span></div>
              <div className="summary-addons">{order.addons.length ? order.addons.map((addon) => <div key={addon.id}><span><Plus size={10} />{addon.name}</span><span>{formatPrice(addon.price)}</span></div>) : <p>Sudah manis apa adanya.<br />Tambahkan detail kecil kalau kamu mau.</p>}</div>
              <div className="summary-total" aria-live="polite" aria-atomic="true"><div><span>Total estimasi</span><strong>{formatPrice(order.total)}</strong></div>{order.deposit && <p>DP 50% mulai {formatPrice(order.deposit)}</p>}</div>
              <p className="summary-note">{config.addonsAreEstimates ? 'Harga add-on masih berupa estimasi. Harga akhir dan jadwal kita sepakati bersama lewat chat.' : 'Kita konfirmasi detail dan jadwal lewat chat sebelum mulai mengerjakan hadiahmu.'}</p>
              <button className="button checkout-button" onClick={() => contact(createOrderMessage(order, notes))}><MessageCircle size={16} /> Kirim pesanan ke WhatsApp <ArrowUpRight size={15} /></button>
              <span className="summary-caption">Belum yakin? Konsultasi dulu juga boleh, kok.</span>
              <Heart className="summary-heart" size={92} strokeWidth={0.5} aria-hidden="true" />
            </aside>
          </div>
        </section>

        <section id="cara-pesan" className="section steps-section" aria-labelledby="steps-title"><div className="section-heading"><div><p className="eyebrow"><span /> DARI KAMU, UNTUK DIA</p><h2 id="steps-title">Empat langkah, sampai ke <em>hatinya.</em></h2><p className="steps-subtitle">Kamu siapkan ceritanya. Kita bantu bikin kejutannya.</p></div></div><div className="steps-grid">{[
          ['Pilih dulu', 'Temukan template yang paling cocok, lalu tambahkan sentuhan personalmu.', 'Lihat koleksi', '#katalog'],
          ['Chat, yuk & bayar', 'Kita sepakati detail, jadwal, dan pembayaran sebelum mulai dibuat.', 'Mulai ngobrol', null],
          ['Lengkapi bahan', 'Siapkan foto, ucapan, dan lagu. Biar kami yang merangkai ceritanya.', 'Siapkan ceritamu', '#personalisasi'],
          ['Voilà, jadi!', 'Terima link hadiahmu, cek bersama, lalu kirim ke orang tersayang.', 'Intip contoh', config.products[0].demo],
        ].map(([title, description, action, href], index) => <div className="step" key={title}><span className="step-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p>{href ? <a href={href} {...(href.startsWith('https') ? { target: '_blank', rel: 'noreferrer' } : {})}>{action}<ArrowUpRight size={12} /></a> : <button onClick={() => contact()}>{action}<ArrowUpRight size={12} /></button>}</div>)}</div></section>

        <section id="faq" className="section faq-section" aria-labelledby="faq-title"><div className="faq-intro"><p className="eyebrow"><span /> A LITTLE HELP</p><h2 id="faq-title">Masih ragu?<br /><em>tanya dulu.</em></h2><p>Nggak ada pertanyaan yang terlalu kecil.<br />Kita bantu sampai kamu yakin.</p><button className="button button-outline" onClick={() => contact()}><MessageCircle size={15} /> Tanya langsung <ArrowUpRight size={14} /></button><span className="faq-flower" aria-hidden="true">✳</span></div><div className="faq-list">{config.faqs.map((faq, index) => <details key={faq.question} open={index === 1 ? true : undefined}><summary>{faq.question}<ChevronDown size={15} /></summary><p>{faq.answer}</p></details>)}</div></section>

        <section className="closing-banner"><div><span className="eyebrow">FOR YOUR FAVORITE PERSON</span><h2>Momennya singkat, <em>rasanya selamanya.</em></h2><p>Jadikan tanggal istimewa mereka punya cerita yang berbeda.<br />Satu hadiah kecil dari kamu bisa berarti banyak.</p></div><div className="closing-actions"><button className="button" onClick={() => contact()}><MessageCircle size={15} /> Pesan via WhatsApp <ArrowUpRight size={14} /></button><a href="#katalog" className="button button-outline">Lihat katalog <ArrowUpRight size={14} /></a></div></section>
      </main>

      <footer className="site-footer"><div className="footer-wrap"><div><span className="footer-script">made with love.</span><p>Hadiah digital, untuk perasaan yang nyata.</p><small>© {new Date().getFullYear()} Knzy Studio</small></div><div className="footer-links"><a href="#katalog">Katalog</a><a href="#cara-pesan">Cara pesan</a><a href="#faq">FAQ</a><button onClick={() => contact()}>Say hello <ArrowUpRight size={12} /></button></div><a href="#" className="back-top" aria-label="Kembali ke atas"><ArrowDown size={16} /></a></div></footer>

      <div className={`toast ${toast ? 'visible' : ''}`} role="status">{toast && <><Heart size={16} />{toast}</>}</div>
      <dialog ref={dialogRef} className="order-dialog" aria-labelledby="dialog-title" onCancel={() => setMessage('')} onClick={(event) => { if (event.target === dialogRef.current) closeDialog(); }} onClose={() => setMessage('')}>
        <button className="icon-button dialog-close" onClick={closeDialog} aria-label="Tutup ringkasan"><X size={20} /></button>
        <p className="eyebrow">SATU LANGKAH LAGI</p><h2 id="dialog-title">Pesanmu sudah <em>siap.</em></h2><p>Kontak WhatsApp toko sedang disiapkan. Kamu bisa menyimpan pesan ini terlebih dahulu.</p>
        <label htmlFor="order-message">Pesan untuk Knzy Studio</label><textarea id="order-message" value={message} readOnly rows={10} />
        <button className="button" onClick={() => copy(message)}><Copy size={15} /> Salin pesan</button>
      </dialog>
    </>
  );
}
