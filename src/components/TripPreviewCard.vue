<script setup lang="ts">
import type { Trip } from '@/lib/api/trips'
import { RouterLink } from 'vue-router'
import { formatDate } from '@vueuse/core'

const { trip } = defineProps<{ trip: Trip }>()
</script>

<template>
  <RouterLink :to="{ path: `/trips/${trip.id}`, state: { title: trip.name } }">
    <div class="flex h-full flex-col overflow-hidden rounded-md border">
      <img :src="trip.coverImage" class="h-64 w-full object-cover" :alt="trip.name" />
      <div class="flex h-full flex-col justify-between p-4">
        <div>
          <p class="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            {{ trip.country }}
          </p>
          <p class="mb-2 text-lg font-bold leading-snug">{{ trip.name }}</p>
        </div>
        <div>
          <p class="text-md font-bold text-red-700 dark:text-red-500">
            {{ trip.currency }} {{ trip.cost }}
          </p>
          <p class="text-sm font-semibold uppercase text-muted-foreground">
            {{ formatDate(new Date(trip.startDate), 'MMM DD, YYYY') }} -
            {{ trip.durationNights }} nights
          </p>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
