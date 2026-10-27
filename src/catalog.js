// Lengkapi whatsappNumber (format 628...), anniversaryPin, dan paymentUrl
// sebelum menerima pesanan. Harga add-on berikut adalah estimasi sementara.
export const CATALOG_CONFIG = {
  brand: 'Knzy Studio',
  whatsappNumber: '',
  anniversaryPin: '',
  paymentUrl: '',
  addonsAreEstimates: true,
  products: [
    {
      id: 'anniversary', name: 'Romantic Anniversary', shortName: 'Anniversary',
      price: 45000, demo: 'https://webhappyanniversarydemo.vercel.app/',
      description: 'Buat kisah kalian punya rumah kecilnya sendiri.',
      features: ['Gate PIN & segel lilin interaktif', 'Story slides, live counter & timeline', 'Galeri foto & video kenangan', 'Kartu alasan 3D, surat typewriter & musik'],
    },
    {
      id: 'birthday', name: 'Sweet Birthday', shortName: 'Birthday',
      price: 40000, demo: 'https://web-happy-birthday-dusky.vercel.app/',
      description: 'Satu kejutan kecil, banyak senyum di hari lahirnya.',
      features: ['Animasi pembuka & kejutan interaktif', 'Galeri momen paling berkesan', 'Ucapan personal dari kamu', 'Musik latar untuk melengkapi suasana'],
    },
    {
      id: 'custom', name: 'Custom Request', shortName: 'Custom',
      price: 75000, demo: null,
      description: 'Ada ide sendiri? Yuk, kita wujudkan bareng.',
      features: ['Bebas request warna & tema', 'Boleh kirim referensi TikTok / Instagram', 'Desain yang personal untuk si dia', 'Termasuk 2× revisi, mulai dengan DP 50%'],
    },
  ],
  addons: [
    { id: 'letter', name: 'Surat cinta typewriter', description: 'Kata-katamu, muncul satu per satu.', price: 10000, includedIn: ['anniversary'] },
    { id: 'gallery', name: 'Ekstra galeri kenangan', description: 'Ruang tambahan untuk cerita kalian.', price: 15000, includedIn: [] },
    { id: 'playlist', name: 'Playlist spesial', description: 'Lebih banyak lagu, lebih banyak rasa.', price: 10000, includedIn: [] },
    { id: 'countdown', name: 'Countdown hari spesial', description: 'Hitung mundur menuju momen bahagia.', price: 10000, includedIn: [] },
    { id: 'video', name: 'Opening video', description: 'Sambut dia dengan video pilihanmu.', price: 15000, includedIn: [] },
  ],
  faqs: [
    { question: 'Aku nggak paham coding, bisa pesan?', answer: 'Bisa banget. Kamu cukup pilih template, siapkan foto dan ucapan, lalu kirim lewat WhatsApp. Knzy Studio yang bantu merangkainya jadi website hadiah untuk orang spesialmu.' },
    { question: 'Apa itu PIN pada demo Anniversary?', answer: 'PIN adalah kunci untuk membuka halaman hadiah Anniversary, supaya kejutannya terasa lebih personal. PIN demo bisa kamu minta lewat chat. Untuk pesananmu, kamu bisa memilih PIN sendiri, misalnya tanggal spesial kalian.' },
    { question: 'Berapa lama proses pembuatannya?', answer: 'Waktu pengerjaan menyesuaikan paket, kelengkapan bahan, dan antrean. Ceritakan tanggal spesialmu saat konsultasi agar kita bisa memastikan jadwal sebelum kamu melakukan pembayaran.' },
    { question: 'Bisa pakai foto, lagu, dan ucapan sendiri?', answer: 'Tentu. Siapkan foto kenangan, ucapan, dan pilihan musik yang boleh kamu gunakan. Kita konfirmasi kebutuhan bahan sesuai paket saat pemesanan.' },
    { question: 'Gimana kalau mau desain di luar template?', answer: 'Pilih Custom Request, lalu ceritakan ide, warna favorit, atau kirim link referensi. Paket custom mulai Rp75.000, termasuk 2× revisi, dan bisa dimulai dengan DP 50% setelah detail disepakati.' },
  ],
};

export const formatPrice = (amount) => `Rp${new Intl.NumberFormat('id-ID').format(amount)}`;

export function getOrder(productId, selectedIds, config = CATALOG_CONFIG) {
  const product = config.products.find((item) => item.id === productId) || config.products[0];
  const addons = config.addons.filter((item) => selectedIds.includes(item.id) && !item.includedIn.includes(product.id));
  const total = product.price + addons.reduce((sum, item) => sum + item.price, 0);
  return { product, addons, total, deposit: product.id === 'custom' ? Math.ceil(total / 2) : null };
}

export function createOrderMessage(order, notes, config = CATALOG_CONFIG) {
  return [
    `Halo ${config.brand}! Aku mau bikin hadiah website 💌`, '',
    `Paket: ${order.product.name}`, `Harga dasar: ${formatPrice(order.product.price)}`,
    'Add-on:', ...(order.addons.length ? order.addons.map((item) => `• ${item.name}: ${formatPrice(item.price)}`) : ['• Tanpa add-on']),
    '', `Total estimasi: ${formatPrice(order.total)}`,
    ...(order.deposit ? [`Estimasi DP 50%: ${formatPrice(order.deposit)}`] : []),
    ...(notes.trim() ? ['', `Catatan / referensi: ${notes.trim()}`] : []),
    '', 'Boleh konfirmasi harga akhir, jadwal pengerjaan, dan cara pembayarannya?',
    ...(config.paymentUrl && /^https:\/\//.test(config.paymentUrl) ? [`Link pembayaran: ${config.paymentUrl}`] : []),
  ].join('\n');
}

export function getWhatsAppUrl(message, number = CATALOG_CONFIG.whatsappNumber) {
  const normalized = number.replace(/[\s+()-]/g, '');
  if (!/^[1-9]\d{7,14}$/.test(normalized)) return null;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
