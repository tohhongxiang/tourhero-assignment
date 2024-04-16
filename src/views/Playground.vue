<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type Trip } from '@/lib/api/trips'
import { Button } from '@/components/ui/button'
import { convertRawTripToTrip } from '@/lib/api/tripDTO'
import TripPreviewCard from '@/components/TripPreviewCard.vue'

const trips = ref<Trip[]>([])
const API_URL = 'http://localhost:5000'

async function getTrips() {
  const fetchedTrips: Trip[] = (
    await fetch(`${API_URL}/trips`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
  ).map((trip: any) => convertRawTripToTrip(trip))

  return fetchedTrips
}

onMounted(async () => {
  trips.value = await getTrips()
})

async function createTrip() {
  const newTrip: { [key: string]: string | number } = {
    id: 'doesnt matter',
    name: 'Another one',
    cost: 999,
    currency: 'SGD',
    cover_image: 'https://assets.tourhero.com/yqx83ok1h0sop4otaoq8huk25noc',
    country: 'Norway',
    start_date: 'Sep 22, 2024',
    duration_nights: 10,
    group_size: 1,
    description: 'Hehe this description'
    // included: [],
    // addOns: []
  }

  const response = await fetch(`${API_URL}/trips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTrip)
  }).then((res) => res.json())

  trips.value.push(convertRawTripToTrip(response))
}

async function deleteTrip(tripId: Trip['id']) {
  await fetch(`${API_URL}/trips/${tripId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  trips.value = trips.value.filter((trip) => trip.id !== tripId)
}

async function createAddOn() {
  const response = await fetch(`${API_URL}/add_ons`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Room Upgrade',
      cost: 1500,
      trip_id: 7,
      spots_remaining: 0
    })
  }).then((res) => res.json())
  console.log(response)
}
</script>

<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-2xl text-primary">Playground</h1>
      <p>This is a playground to interact with the rails server</p>
    </div>

    <h2 class="text-2xl text-primary">Trips</h2>
    <p v-if="trips.length === 0">No trips boy</p>
    <ul v-else>
      <li v-for="trip in trips" :key="trip.id" class="p-4">
        <TripPreviewCard :trip="trip" />
        <Button @click="deleteTrip(trip.id)">Delete this trip</Button>
      </li>
    </ul>

    <Button @click="createTrip">Create trip</Button>
    <Button @click="createAddOn">Create Add On</Button>
  </div>
</template>
