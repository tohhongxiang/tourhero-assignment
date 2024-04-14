export type Trip = {
  id: string
  name: string
  cost: number
  currency: string
  coverImage: string
  country: string
  startDate: string
  durationNights: number
  groupSize: number
}

const trips = [
  {
    id: 'iceland',
    name: 'A Wonderful Journey into the Beauty of Iceland',
    cost: 3590,
    currency: 'EUR',
    coverImage: 'https://assets.tourhero.com/091nb9apf6i4n7l3bye9bqjsm3i8',
    country: 'Iceland',
    startDate: 'Sep 14, 2024',
    durationNights: 8,
    groupSize: 4
  },
  {
    id: 'malaysia',
    name: 'Exploring Malaysia!',
    cost: 1500,
    currency: 'MYR',
    coverImage: 'https://assets.tourhero.com/5uxz86mupsjzraskvia97o2qbct2',
    country: 'Malaysia',
    startDate: 'Aug 15, 2024',
    durationNights: 4,
    groupSize: 8
  },
  {
    id: 'japan',
    name: 'A Week in Tokyo',
    cost: 1900,
    currency: '¥',
    coverImage: 'https://assets.tourhero.com/txyke9osloaw4hng4qkx5kzldtjk',
    country: 'Japan',
    startDate: 'May 17, 2024',
    durationNights: 6,
    groupSize: 6
  },
  {
    id: 'norway',
    name: 'Norwegian Getaway',
    cost: 2890,
    currency: 'NOK',
    coverImage: 'https://assets.tourhero.com/yqx83ok1h0sop4otaoq8huk25noc',
    country: 'Norway',
    startDate: 'June 18, 2024',
    durationNights: 13,
    groupSize: 6
  }
]

export async function getAllTrips() {
  await new Promise((r) => setTimeout(r, 2000))
  return Promise.resolve(trips)
}

export async function getTrip(tripId: string) {
  return Promise.resolve(trips.find((trip) => trip.id === tripId))
}
