<script setup lang="ts">
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import TripList from '@/components/TripList.vue'
</script>

<template>
  <main class="p-8">
    <h1 class="mb-8 text-2xl font-bold">Recommended Trips for You!</h1>
    <Suspense>
      <TripList />
      <template #fallback>
        <LoadingIndicator />
      </template>
    </Suspense>
  </main>
</template>
