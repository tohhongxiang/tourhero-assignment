<script setup lang="ts">
import { getTrip } from '@/lib/api/trips'
import CheckoutFormContainer from './CheckoutFormContainer.vue'

const props = defineProps<{ tripId: string }>()
const tripDetails = await getTrip(props.tripId)
</script>

<template>
  <CheckoutFormContainer v-if="tripDetails" :trip="tripDetails" />
  <div v-else>
    <p class="text-xl font-semibold italic text-muted-foreground">Trip Not Found</p>
  </div>
</template>
