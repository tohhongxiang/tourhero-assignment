import type { Trip } from './trips'

export type RawTrip = {
  id: number
  name: string
  cost: number
  currency: string
  cover_image: string
  country: string
  start_date: string
  duration_nights: number
  group_size: number
  description: string
  add_ons: RawTripAddOn[]
  included: string
}

export type RawTripAddOn = {
  id: number
  name: string
  cost: number
  spots_remaining?: number
  time_start?: string
  time_end?: string
  trip_id: number
}

export function convertRawTripToTrip(rawTrip: RawTrip): Trip {
  const trip: Trip = {
    id: rawTrip.id.toString(),
    name: rawTrip.name,
    cost: rawTrip.cost,
    currency: rawTrip.currency,
    coverImage: rawTrip.cover_image,
    country: rawTrip.country,
    startDate: rawTrip.start_date,
    durationNights: rawTrip.duration_nights,
    groupSize: rawTrip.group_size,
    included: rawTrip.included.length === 0 ? [] : JSON.parse(rawTrip.included),
    description: rawTrip.description,
    addOns: rawTrip.add_ons.map((addOn) => ({
      id: addOn.id.toString(),
      name: addOn.name,
      cost: addOn.cost,
      spotsRemaining: addOn.spots_remaining,
      timeStart: addOn.time_start,
      timeEnd: addOn.time_end
    }))
  }

  return trip
}

export function convertTripToRawTrip(trip: Trip): RawTrip {
  const rawTrip: RawTrip = {
    id: parseInt(trip.id),
    name: trip.name,
    cost: trip.cost,
    currency: trip.currency,
    cover_image: trip.coverImage,
    country: trip.country,
    start_date: trip.startDate,
    duration_nights: trip.durationNights,
    group_size: trip.groupSize,
    included: JSON.stringify(trip.included),
    description: trip.description,
    add_ons: trip.addOns.map((addOn) => ({
      id: parseInt(addOn.id),
      name: addOn.name,
      cost: addOn.cost,
      spotsRemaining: addOn.spotsRemaining,
      time_start: addOn.timeStart,
      time_end: addOn.timeEnd,
      trip_id: parseInt(trip.id)
    }))
  }

  return rawTrip
}
