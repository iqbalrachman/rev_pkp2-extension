// Satu-satunya tempat URL Apps Script disimpan. Kalau lo redeploy Apps Script
// dan URL /exec berubah, cukup update baris ini aja - nggak perlu obrak-abrik
// file lain.
const API_URL = 'https://script.google.com/macros/s/AKfycbxphA_A0OyZsznpEwAFsKotLErEGkVtox8-g23KAojlOfxpE8wVjLnXu9l9XeP6dN8aCg/exec';

/**
 * Dipanggil di frontmatter halaman .astro (jalan di Node.js pas build,
 * BUKAN di browser visitor) - jadi visitor akhir nggak pernah nunggu API ini.
 */
export async function getSiteData() {
  const res = await fetch(`${API_URL}?action=all`);
  if (!res.ok) {
    throw new Error(`Gagal fetch data dari Apps Script (status ${res.status}). Cek apakah deployment masih aktif.`);
  }
  const data = await res.json();
  if (data.error) {
    throw new Error(`Apps Script mengembalikan error: ${data.error}`);
  }
  return data; // { content, units, gallery, articles, generated_at }
}

/** Cari foto pertama (sesuai urutan) untuk kategori & unit_id tertentu. */
export function findCoverImage(gallery, kategori, unitId) {
  return gallery
    .filter(g => g.kategori === kategori && g.unit_id === unitId && g.image_url)
    .sort((a, b) => (a.urutan || 0) - (b.urutan || 0))[0] || null;
}
