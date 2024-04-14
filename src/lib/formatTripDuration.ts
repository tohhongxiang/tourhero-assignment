import format from 'dateformat'

function formatDate(date: Date) {
  return format(date, 'mmm dd, yyyy')
}

const ONE_DAY = 1000 * 60 * 60 * 24
function calculateEndDate(startDate: Date, durationNights: number) {
  return new Date(startDate.getTime() + ONE_DAY * durationNights)
}

export default function formatTripDuration(startDate: Date, durationNights: number) {
  const startDateString = formatDate(startDate)
  const endDateString = formatDate(calculateEndDate(startDate, durationNights))

  return `${startDateString} - ${endDateString}`
}
