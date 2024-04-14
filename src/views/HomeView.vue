<script setup lang="ts">
import TripList from '@/components/TripList.vue'
import { LoaderCircle } from 'lucide-vue-next'
</script>

<template>
  <main class="p-8">
    <h1 class="mb-8 text-2xl font-bold">Recommended Trips for You!</h1>
    <Suspense>
      <TripList />
      <template #fallback>
        <div class="flex items-center justify-center gap-2">
          <LoaderCircle class="animate-spin stroke-muted-foreground" />
          <p class="text-lg italic text-muted-foreground">Loading...</p>
        </div>
      </template>
    </Suspense>
  </main>
</template>
