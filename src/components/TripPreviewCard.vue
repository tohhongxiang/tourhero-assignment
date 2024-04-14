<script setup lang="ts">
import type { Trip } from '@/lib/trips'

const { trip } = defineProps<{ trip: Trip }>()
</script>

<template>
  <RouterLink :to="`/trips/${trip.id}`">
    <div class="overflow-hidden rounded-md border border-gray-600/10">
      <img :src="trip.coverImage" class="h-64 w-full object-cover" />
      <div class="p-4">
        <p class="text-lg font-bold">{{ trip.name }}</p>
        <p class="font-semibold text-muted-foreground">From: USD {{ trip.cost }}</p>
      </div>
    </div>
  </RouterLink>
</template>
