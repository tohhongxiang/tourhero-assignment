<script setup lang="ts">
import { useRoute } from 'vue-router'
import TripDetails from '@/components/TripDetails.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

const { params } = useRoute()
</script>

<template>
  <main class="px-4 py-16 sm:px-8 md:px-16 xl:px-32">
    <Suspense>
      <TripDetails :trip-id="params.tripId as string" />
      <template #fallback>
        <LoadingIndicator />
      </template>
    </Suspense>
  </main>
</template>
