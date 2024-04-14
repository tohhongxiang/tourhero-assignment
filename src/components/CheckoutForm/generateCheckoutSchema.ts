import type { Trip } from '../../lib/trips'
import { z } from 'zod'

export default function generateCheckoutSchema(trip: Trip) {
  return z.object({
    name: z.string().min(1, { message: 'Please enter at least 1 character' }),
    lastName: z.string(),
    email: z.string().email(),

    addOns: z.object(
      Object.fromEntries(trip.addOns.map((addOn) => [addOn.name, z.boolean().default(false)]))
    ),

    acceptTermsAndConditions: z
      .optional(z.boolean())
      .refine((val) => val === true, { message: 'Please accept the terms and conditions' })
  })
}
