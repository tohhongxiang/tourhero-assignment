export type Trip = {
  id: string
  name: string
  cost: number
  coverImage: string
}

const trips = [
  {
    id: 'iceland',
    name: 'Iceland',
    cost: 3590,
    coverImage: 'https://assets.tourhero.com/091nb9apf6i4n7l3bye9bqjsm3i8'
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    cost: 1500,
    coverImage: 'https://assets.tourhero.com/5uxz86mupsjzraskvia97o2qbct2'
  },
  {
    id: 'japan',
    name: 'Japan',
    cost: 1900,
    coverImage: 'https://assets.tourhero.com/txyke9osloaw4hng4qkx5kzldtjk'
  },
  {
    id: 'norway',
    name: 'Norway',
    cost: 2890,
    coverImage: 'https://assets.tourhero.com/yqx83ok1h0sop4otaoq8huk25noc'
  }
]

export async function getAllTrips() {
  await new Promise((r) => setTimeout(r, 2000))
  return Promise.resolve(trips)
}

export async function getTrip(tripId: string) {
  return Promise.resolve(trips.find((trip) => trip.id === tripId))
}
