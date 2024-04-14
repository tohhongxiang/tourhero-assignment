import { formatDate } from '@vueuse/core'

const ONE_DAY = 1000 * 60 * 60 * 24
function calculateEndDate(startDate: Date, durationNights: number) {
  return new Date(startDate.getTime() + ONE_DAY * durationNights)
}

export default function formatTripDuration(startDate: Date, durationNights: number) {
  const endDate = calculateEndDate(startDate, durationNights)

  if (endDate.getFullYear() === startDate.getFullYear()) {
    return `${formatDate(startDate, 'MMM DD')} - ${formatDate(endDate, 'MMM DD, YYYY')}`
  }

  return `${formatDate(startDate, 'MMM DD, YYYY')} - ${formatDate(endDate, 'MMM DD, YYYY')}`
}
