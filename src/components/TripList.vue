<script setup lang="ts">
import { getAllTrips } from '@/lib/trips'
import TripPreviewCard from './TripPreviewCard.vue'

const trips = await getAllTrips()
</script>

<template>
  <ul class="grid grid-cols-3 gap-4">
    <li v-for="trip in trips" :key="trip.id">
      <TripPreviewCard :trip="trip" />
    </li>
  </ul>
</template>
