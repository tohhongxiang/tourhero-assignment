import { convertRawTripToTrip, type RawTrip, type RawTripAddOn } from './tripDTO'

export type Trip = {
  id: string
  name: string
  cost: number
  currency: string
  coverImage: string
  country: string
  startDate: string // date string
  durationNights: number
  groupSize: number
  included: string[]
  description: string
  addOns: TripAddOn[]
}

export type TripAddOn = {
  id: string
  name: string
  cost: number
  spotsRemaining?: number
  timeStart?: string // date string
  timeEnd?: string // date string
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
    groupSize: 4,
    included: [
      'All accomodations',
      'All activities described in the itinerary',
      'Bilingual guides during activities',
      'Transportation between activities and accommodation (except day 1 and day 9)',
      'Fully-guided hike around Fagradalsfjall',
      'Exciting photo opportunities',
      'Excursion transfers',
      'Shared occupancy in accommodation',
      '24/7 guest support'
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dignissim nulla et risus viverra, nec tincidunt velit gravida. Ut cursus scelerisque leo, facilisis faucibus purus semper non. Sed vestibulum odio venenatis viverra consectetur. Aenean dignissim blandit orci eget luctus. In lorem mi, imperdiet in mi et, placerat ultrices urna. Cras ultricies est in sapien tincidunt, nec molestie nunc placerat. Curabitur mollis imperdiet nulla, ac ultrices nisi. Mauris vulputate turpis luctus volutpat pretium. Maecenas sed egestas purus. Donec eget orci dignissim, varius felis eu, sagittis justo. Nulla et magna tortor. Morbi consequat tortor nec volutpat feugiat. Morbi et urna eu tellus vestibulum congue. Sed egestas ipsum arcu, id vulputate nisi ultrices sed. Mauris non odio sit amet purus tristique semper nec eu risus. Pellentesque in massa vitae eros condimentum auctor.',
    addOns: [
      { name: 'SIM card', cost: 15 },
      { name: 'Single room upgrade', cost: 1500, spotsRemaining: 4 },
      {
        name: 'Visit to cultural house',
        cost: 30,
        spotsRemaining: 0,
        timeStart: 'Sep 15, 2024 10:00:00',
        timeEnd: 'Sep 15, 2024 13:00:00'
      },
      {
        name: 'Visit to museum',
        cost: 15,
        spotsRemaining: 3,
        timeStart: 'Sep 15, 2024 15:00:00',
        timeEnd: 'Sep 15, 2024 18:00:00'
      },
      {
        name: 'Picturesque lunch',
        cost: 25,
        spotsRemaining: 6,
        timeStart: 'Sep 15, 2024 12:00:00',
        timeEnd: 'Sep 15, 2024 16:00:00'
      }
    ]
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
    groupSize: 8,
    included: [
      'All accomodations',
      'All activities described in the itinerary',
      'Bilingual guides during activities',
      'Transportation between activities and accommodation (except day 1 and day 5)',
      'Day 2, 3 and 4 breakfast',
      'Day 2 and 4 lunch',
      'Excursion transfers',
      'Shared occupancy in accommodation',
      '24/7 guest support'
    ],
    description:
      'Praesent iaculis sagittis libero, at ultricies felis pharetra imperdiet. Duis finibus, erat eget ultricies porta, nisl dui tempus lorem, eget vulputate lorem nisi vel risus. Morbi at lorem vel purus pretium semper. Donec pretium, quam eget tempor vehicula, sapien erat consequat ipsum, sit amet pharetra nibh purus nec dui. Praesent id justo libero. Nunc tortor dolor, dignissim sed volutpat eu, faucibus at sapien. Etiam eget est volutpat, commodo elit id, laoreet arcu. Maecenas ac luctus mi. Etiam condimentum ante a malesuada scelerisque. Nulla facilisi. Proin pellentesque, diam sed bibendum rhoncus, turpis turpis lacinia leo, vel sollicitudin lectus velit nec lacus. In tempus maximus mauris, a fermentum augue auctor ut. Morbi nec ultrices lorem.',
    addOns: []
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
    groupSize: 6,
    included: [
      'All accomodations',
      'All activities described in the itinerary',
      'Bilingual guides during activities',
      'Breakfast, lunch and dinner provided on all days (except first and last)',
      'Excursion transfers',
      'Shared occupancy in accommodation',
      '24/7 guest support'
    ],
    description:
      'Duis faucibus tempor dolor, nec blandit tortor ullamcorper et. Aliquam erat volutpat. Duis lacinia neque at ornare molestie. Morbi dictum sem et sollicitudin tincidunt. Praesent id libero justo. In non auctor libero. Etiam varius lorem enim, a eleifend turpis tristique non. Cras tristique, justo fermentum mattis vulputate, elit sapien placerat felis, et euismod magna tellus vitae ipsum. Quisque nec fringilla purus, sit amet viverra turpis. Fusce dictum pellentesque scelerisque. Vivamus dignissim pharetra enim eu rhoncus. Phasellus tincidunt et velit quis ultrices. Fusce in magna eu odio cursus pulvinar at eu massa. Morbi finibus imperdiet quam, non viverra quam vestibulum vel.',
    addOns: []
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
    groupSize: 6,
    included: [
      'All accomodations',
      'All activities described in the itinerary',
      'Northern Lights hunting on the final night',
      'Food fully provided',
      'Excursion transfers',
      'Shared occupancy in accommodation',
      '24/7 guest support'
    ],
    description:
      'Aenean sem sapien, lacinia id dolor et, condimentum ullamcorper diam. Sed molestie quam ante, ac egestas lorem scelerisque eu. Donec lobortis dapibus dolor, quis fringilla est venenatis eu. Phasellus mi arcu, elementum ut viverra sit amet, lacinia vel nunc. Donec porta diam at pulvinar efficitur. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec aliquam consequat ultricies. Etiam bibendum libero purus, quis condimentum augue volutpat sed. Nunc tincidunt mi ac metus faucibus, vitae tristique tellus pellentesque. Suspendisse vitae orci tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris malesuada tortor et quam feugiat placerat. Suspendisse in fringilla ipsum. Phasellus mi lectus, convallis sed sapien et, fermentum porttitor turpis. Fusce interdum porttitor justo, ac lobortis purus. Praesent feugiat luctus ex ac elementum.',
    addOns: [{ name: 'Ski trip in Fjellheisen', cost: 800 }]
  }
]

const API_URL = `http://localhost:5000`
export async function getAllTrips() {
  const fetchedTrips: RawTrip[] = await fetch(`${API_URL}/trips`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json())

  const processedTrips = fetchedTrips.map((rawTrip) => convertRawTripToTrip(rawTrip))
  return processedTrips
}

export async function getTrip(tripId: string) {
  const fetchedTrip: RawTrip = await fetch(`${API_URL}/trips/${tripId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json())

  const processedTrip = convertRawTripToTrip(fetchedTrip)
  return processedTrip
}

export async function bookAddOn(addOn: TripAddOn) {
  try {
    await fetch(`${API_URL}/add_ons/${addOn.id}/book`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())

    return { success: true } // todo: Handle API error better
  } catch (e) {
    return { success: false }
  }
}
