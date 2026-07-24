export function formatRupiah(num) {
  if (num === null || num === undefined || num === '') return '';
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Bersihin nomor telepon dari karakter aneh - di sheet Content kolom
 * whatsapp_number kadang kesimpen sebagai "=6285691235723" (artefak dari
 * Google Sheets), jadi kita jaga-jaga strip semua yang bukan digit.
 */
export function cleanPhoneNumber(raw) {
  if (!raw) return '';
  return String(raw).replace(/[^0-9]/g, '');
}

export function buildWaLink(phoneRaw, message) {
  const phone = cleanPhoneNumber(phoneRaw);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

const STATUS_STYLE = {
  'Available': { color: 'var(--color-status-available)', label: 'Tersedia' },
  'Sold': { color: 'var(--color-status-sold)', label: 'Terjual' },
  'Ready Unit': { color: 'var(--color-status-ready)', label: 'Ready Unit' },
  'Progress (Ready Stock)': { color: 'var(--color-status-progress)', label: 'Progress' }
};

export function statusStyle(status) {
  return STATUS_STYLE[status] || { color: 'var(--color-navy-soft)', label: status || '-' };
}
