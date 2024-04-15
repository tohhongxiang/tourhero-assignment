import type { Trip } from '../../lib/api/trips'
import { z } from 'zod'

export default function generateCheckoutSchema(trip: Trip) {
  const addOnsWithTimeSorted = trip.addOns
    .filter((addOns) => addOns.timeStart && addOns.timeEnd)
    .sort(
      (addOn1, addOn2) =>
        new Date(addOn1.timeStart!).getTime() - new Date(addOn2.timeStart!).getTime()
    )

  return z.object({
    name: z.string().min(1, { message: 'Please enter at least 1 character' }),
    lastName: z.string(),
    email: z.string().email(),

    addOns: z
      .object(
        Object.fromEntries(trip.addOns.map((addOn) => [addOn.name, z.boolean().default(false)]))
      )
      .optional()
      .superRefine((vals, ctx) => {
        for (let i = 0; i < addOnsWithTimeSorted.length - 1; i++) {
          const firstAddOn = addOnsWithTimeSorted[i]
          const secondAddOn = addOnsWithTimeSorted[i + 1]

          if (
            vals?.[firstAddOn.name] &&
            vals?.[secondAddOn.name] &&
            new Date(firstAddOn.timeEnd!) > new Date(secondAddOn.timeStart!)
          ) {
            ctx.addIssue({
              code: 'custom',
              message: 'Conflict between time slots',
              path: [firstAddOn.name]
            })

            ctx.addIssue({
              code: 'custom',
              message: 'Conflict between time slots',
              path: [secondAddOn.name]
            })
          }
        }
      }),

    acceptTermsAndConditions: z
      .optional(z.boolean())
      .refine((val) => val === true, { message: 'Please accept the terms and conditions' })
  })
}
