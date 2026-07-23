<script setup>
import { ref, computed } from 'vue';
import { statusStyle, formatRupiah } from '../lib/format.js';

const props = defineProps({
  units: { type: Array, required: true }
});

const filters = ['Semua', 'Available', 'Ready Unit', 'Progress (Ready Stock)', 'Sold'];
const active = ref('Semua');

const filtered = computed(() => {
  if (active.value === 'Semua') return props.units;
  return props.units.filter(u => u.status === active.value);
});

function chipLabel(f) {
  return f === 'Semua' ? 'Semua' : statusStyle(f).label;
}
</script>

<template>
  <div class="filter-chips" role="group" aria-label="Filter status unit">
    <button
      v-for="f in filters"
      :key="f"
      type="button"
      class="chip"
      :class="{ 'is-active': active === f }"
      @click="active = f"
    >
      {{ chipLabel(f) }}
    </button>
  </div>

  <div class="units-grid">
    <article v-for="unit in filtered" :key="unit.id" class="unit-card">
      <div class="unit-photo">
        <img
          v-if="unit.coverSrc"
          :src="unit.coverSrc"
          :alt="unit.coverCaption || `Tipe ${unit.tipe}`"
          loading="lazy"
        />
        <div v-else class="unit-photo-placeholder">Foto belum tersedia</div>
        <span class="unit-status" :style="{ '--status-color': statusStyle(unit.status).color }">
          {{ statusStyle(unit.status).label }}
        </span>
      </div>

      <div class="unit-body">
        <h3>Tipe {{ unit.tipe }}</h3>
        <p v-if="unit.deskripsi" class="unit-desc">{{ unit.deskripsi }}</p>
        <ul class="unit-specs">
          <li v-if="unit.luas_tanah">LT {{ unit.luas_tanah }} m²</li>
          <li v-if="unit.luas_bangunan">LB {{ unit.luas_bangunan }} m²</li>
          <li v-if="unit.kamar">{{ unit.kamar }} KT</li>
        </ul>
        <div class="unit-footer">
          <span class="unit-price">{{ formatRupiah(unit.harga) }}</span>
        </div>
      </div>
    </article>

    <p v-if="filtered.length === 0" class="empty-state">Belum ada unit dengan status ini.</p>
  </div>
</template>

<style scoped>
.filter-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: var(--space-lg);
}
.chip {
  background: var(--color-white);
  border: 1px solid var(--color-paper);
  color: var(--color-navy-soft);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.chip:hover {
  border-color: var(--color-gold);
}
.chip.is-active {
  background: var(--color-navy);
  border-color: var(--color-navy);
  color: var(--color-white);
}
.units-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
}
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--color-navy-soft);
  padding: var(--space-lg) 0;
}
.unit-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
}
.unit-photo {
  position: relative;
  aspect-ratio: 4 / 3;
  background: var(--color-paper);
}
.unit-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.unit-photo-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--color-navy-soft);
  font-size: 0.85rem;
}
.unit-status {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--status-color);
  color: var(--color-white);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
}
.unit-body {
  padding: var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}
.unit-body h3 {
  font-size: 1.25rem;
}
.unit-desc {
  font-size: 0.88rem;
  color: var(--color-navy-soft);
  line-height: 1.5;
}
.unit-specs {
  display: flex;
  gap: 12px;
  list-style: none;
  font-size: 0.82rem;
  color: var(--color-navy-soft);
  flex-wrap: wrap;
  padding: 0;
}
.unit-footer {
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid var(--color-paper);
}
.unit-price {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--color-navy);
}
</style>
