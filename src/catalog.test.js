import test from 'node:test';
import assert from 'node:assert/strict';
import { CATALOG_CONFIG, getOrder, createOrderMessage, getWhatsAppUrl } from './catalog.js';

test('paket anniversary tidak menagih lagi fitur yang sudah termasuk', () => {
  const order = getOrder('anniversary', ['letter', 'gallery', 'gallery', 'unknown']);
  assert.equal(order.total, 60000);
  assert.deepEqual(order.addons.map((item) => item.id), ['gallery']);
});

test('pergantian paket menghitung ulang add-on dan DP hanya untuk custom', () => {
  assert.equal(getOrder('birthday', ['letter']).total, 50000);
  assert.equal(getOrder('birthday', ['letter']).deposit, null);
  const custom = getOrder('custom', ['letter', 'gallery']);
  assert.equal(custom.total, 100000);
  assert.equal(custom.deposit, 50000);
});

test('pesan pesanan menyertakan detail, catatan, dan pembayaran yang dikonfigurasi', () => {
  const order = getOrder('custom', ['video']);
  const message = createOrderMessage(order, '  Tema pink & lagu favorit 💕  ', { ...CATALOG_CONFIG, paymentUrl: 'https://example.com/pay' });
  assert.match(message, /Total estimasi: Rp90\.000/);
  assert.match(message, /Estimasi DP 50%: Rp45\.000/);
  assert.match(message, /Opening video: Rp15\.000/);
  assert.match(message, /Catatan \/ referensi: Tema pink & lagu favorit 💕/);
  assert.match(message, /Link pembayaran: https:\/\/example.com\/pay/);
});

test('checkout memerlukan nomor valid dan mengodekan pesan dengan aman', () => {
  assert.equal(getWhatsAppUrl('test', ''), null);
  assert.equal(getWhatsAppUrl('test', 'nomor-belum-diisi'), null);
  const message = 'Hai! 💌\nCatatan: pink & krem #1';
  const url = new URL(getWhatsAppUrl(message, '+62 812-3456-7890'));
  assert.equal(url.pathname, '/6281234567890');
  assert.equal(url.searchParams.get('text'), message);
});
