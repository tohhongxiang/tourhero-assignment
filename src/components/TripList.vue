<script setup lang="ts">
import { getAllTrips } from '@/lib/api/trips'
import TripPreviewCard from './TripPreviewCard.vue'

const trips = await getAllTrips()
</script>

<template>
  <ul class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    <li v-for="trip in trips" :key="trip.id">
      <TripPreviewCard :trip="trip" />
    </li>
  </ul>
</template>
