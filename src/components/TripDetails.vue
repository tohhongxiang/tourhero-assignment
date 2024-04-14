<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { getTrip } from '@/lib/trips'
import { CircleCheckBig, CircleDollarSign } from 'lucide-vue-next'

const props = defineProps<{ tripId: string }>()
const tripDetails = await getTrip(props.tripId)
</script>

<template>
  <div v-if="!tripDetails" class="text-center">
    <p class="text-xl font-semibold italic text-muted-foreground">Trip Not Found</p>
  </div>
  <div v-else class="flex flex-col gap-8">
    <h1 class="text-4xl font-bold">{{ tripDetails.name }}</h1>
    <img :src="tripDetails.coverImage" />
    <div class="flex flex-col gap-8 md:flex-row">
      <div
        class="grid w-full grid-cols-1 gap-4 rounded-md border border-gray-600/10 p-8 sm:grid-cols-2 md:grid-cols-3"
      >
        <div>
          <p class="text-sm font-semibold uppercase text-muted-foreground">Duration</p>
          <p>{{ tripDetails.durationNights + 1 }} days, {{ tripDetails.durationNights }} nights</p>
        </div>
        <div>
          <p class="text-sm font-semibold uppercase text-muted-foreground">Start Date</p>
          <p>{{ tripDetails.startDate }}</p>
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
      <div class="w-full rounded-md border border-gray-600/10 p-8 md:w-1/3">
        <div class="mb-4 flex items-center gap-2 md:mb-8">
          <CircleDollarSign />
          <h2 class="text-2xl font-bold">Tour Price</h2>
        </div>
        <div class="flex flex-col items-center justify-center gap-4">
          <p class="text-2xl font-bold">
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
      <div class="w-full rounded-md border border-gray-600/10 p-6">
        <p class="font-semibold">{{ tripDetails.description }}</p>
      </div>
      <div class="rounded-md border border-gray-600/10 p-6">
        <div class="mb-4 flex flex-row items-center gap-2">
          <img src="@/components/icons/PaperWithCheck.svg" />
          <h4 class="text-2xl font-semibold text-primary">Included</h4>
        </div>
        <ul class="flex flex-col gap-4">
          <li v-for="(item, index) in tripDetails.included" :key="index" class="flex gap-2">
            <CircleCheckBig class="shrink-0 stroke-green-800" />{{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
