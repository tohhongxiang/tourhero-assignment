<script setup lang="ts">
import CheckoutForm from '@/components/CheckoutForm/index.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import { useRoute } from 'vue-router'

const { params } = useRoute()
</script>

<template>
  <main class="px-4 py-16 sm:px-8 md:px-16 xl:px-32">
    <Suspense>
      <CheckoutForm :trip-id="params.tripId as string" />
      <template #fallback>
        <LoadingIndicator />
      </template>
    </Suspense>
  </main>
</template>
