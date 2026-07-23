import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  // Sementara masih di iqbalrachman.github.io/pkp2-extension (belum ada custom domain).
  // NANTI kalau domain purikencanapermai2.com udah aktif via Hostinger + file CNAME,
  // ganti site di bawah ini ke 'https://www.purikencanapermai2.com' dan HAPUS baris `base`.
  site: 'https://iqbalrachman.github.io',
  base: '/rev_pkp2-extension',

  integrations: [vue()],

  image: {
    // Astro pakai Sharp di balik layar buat resize/convert gambar saat build -
    // ini yang bakal kita pakai buat optimasi foto dari Drive di tahap 1b.
    service: { entrypoint: 'astro/assets/services/sharp' }
  }
});
