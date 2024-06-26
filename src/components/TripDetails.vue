<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { getTrip } from '@/lib/api/trips'
import formatTripDuration from '@/lib/formatTripDuration'
import { CircleCheckBig, CircleDollarSign } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{ tripId: string }>()
const tripDetails = await getTrip(props.tripId)
const tripDuration = computed(() =>
  tripDetails ? formatTripDuration(new Date(tripDetails.startDate), tripDetails.durationNights) : ''
)
</script>

<template>
  <div v-if="!tripDetails" class="text-center">
    <p class="text-xl font-semibold italic text-muted-foreground">Trip Not Found</p>
  </div>
  <div v-else class="flex flex-col gap-8">
    <h1 class="text-4xl font-bold">{{ tripDetails.name }}</h1>
    <img :src="tripDetails.coverImage" alt="" />
    <div class="flex flex-col gap-8 md:flex-row">
      <div
        class="grid w-full grid-cols-1 gap-4 rounded-md border p-8 sm:grid-cols-2 md:grid-cols-3"
      >
        <div>
          <p class="text-sm font-semibold uppercase text-muted-foreground">Duration</p>
          <p>{{ tripDetails.durationNights + 1 }} days, {{ tripDetails.durationNights }} nights</p>
        </div>
        <div>
          <p class="text-sm font-semibold uppercase text-muted-foreground">Date</p>
          <p>{{ tripDuration }}</p>
        </div>
        <div>
          <p class="text-sm font-semibold uppercase text-muted-foreground">Country</p>
          <p>{{ tripDetails.country }}</p>
        </div>
        <div>
          <p class="text-sm font-semibold uppercase text-muted-foreground">Group Size</p>
          <p>{{ tripDetails.groupSize }}</p>
        </div>
      </div>
      <div class="w-full rounded-md border p-6 md:w-1/3">
        <div class="mb-4 flex items-center gap-2">
          <CircleDollarSign class="stroke-1 text-primary" />
          <h2 class="text-2xl font-semibold text-primary">Tour Price</h2>
        </div>
        <div class="flex flex-col items-center justify-center gap-4">
          <p class="text-3xl font-bold text-primary">
            {{ tripDetails.currency }} {{ tripDetails.cost }}
            <span class="text-lg font-semibold text-muted-foreground">/ person</span>
          </p>
          <Button as-child>
            <RouterLink :to="`/trips/${props.tripId}/checkout`" class="bg-[#d50037]"
              >Reserve your spot!</RouterLink
            >
          </Button>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-8 md:flex-row">
      <div class="w-full rounded-md border p-6">
        <p class="font-semibold">{{ tripDetails.description }}</p>
      </div>
      <div class="shrink-0 rounded-md border p-6">
        <div class="mb-4 flex flex-row items-center gap-2">
          <img src="@/assets/icons/PaperWithCheck.svg" alt="" />
          <h2 class="text-2xl font-semibold text-primary">Included</h2>
        </div>
        <ul class="flex flex-col gap-4">
          <li v-for="(item, index) in tripDetails.included" :key="index" class="flex gap-2">
            <CircleCheckBig class="shrink-0 stroke-green-700" />{{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
