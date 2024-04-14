import format from 'dateformat'

const ONE_DAY = 1000 * 60 * 60 * 24
function calculateEndDate(startDate: Date, durationNights: number) {
  return new Date(startDate.getTime() + ONE_DAY * durationNights)
}

export default function formatTripDuration(startDate: Date, durationNights: number) {
  const endDate = calculateEndDate(startDate, durationNights)

  console.log(startDate.getFullYear(), endDate.getFullYear())
  if (endDate.getFullYear() === startDate.getFullYear()) {
    return `${format(startDate, 'mmm dd')} - ${format(endDate, 'mmm dd, yyyy')}`
  }

  return `${format(startDate, 'mmm dd, yyyy')} - ${format(endDate, 'mmm dd, yyyy')}`
}
