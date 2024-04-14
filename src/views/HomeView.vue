<script setup lang="ts">
import { h } from 'vue'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = toTypedSchema(
  z.object({
    name: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    singleSupplementUpgrade: z.boolean().default(false),
    simCard: z.boolean().default(false),
    acceptTermsAndConditions: z
      .optional(z.boolean())
      .refine((val) => val === true, { message: 'Please accept the terms and conditions' })
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))
    )
  })
})
</script>

<template>
  <main class="px-4 py-16 sm:px-8 md:px-16 xl:px-32">
    <h2 class="mb-8 text-2xl font-bold">Checkout</h2>
    <form class="flex w-full flex-col-reverse gap-4 sm:flex-row" @submit.prevent="onSubmit">
      <div class="flex w-full flex-col gap-4">
        <div class="rounded-md border border-gray-600/10 p-6">
          <h4 class="mb-4 text-2xl font-semibold text-primary">Guest details</h4>
          <div class="flex flex-col justify-between gap-4 lg:flex-row">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem class="flex w-full flex-col justify-end">
                <div class="h-full">
                  <FormLabel class="text-xs font-bold uppercase text-muted-foreground"
                    >Name</FormLabel
                  >
                  <FormDescription class="mt-0 text-xs font-bold text-muted-foreground"
                    >(as per travel document)</FormDescription
                  >
                  <FormMessage />
                </div>
                <FormControl>
                  <Input type="text" placeholder="Millie" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="lastName">
              <FormItem class="flex w-full flex-col justify-end">
                <div class="h-full">
                  <FormLabel class="text-xs font-bold uppercase text-muted-foreground"
                    >Last Name
                  </FormLabel>
                  <FormDescription class="mt-0 text-xs font-bold text-muted-foreground"
                    >(as per travel document)</FormDescription
                  >
                  <FormMessage />
                </div>
                <FormControl>
                  <Input type="text" placeholder="Moo" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="email">
              <FormItem class="flex w-full flex-col justify-end">
                <div class="h-full">
                  <FormLabel class="self-start text-xs font-bold uppercase text-muted-foreground"
                    >Email</FormLabel
                  >
                  <FormMessage />
                </div>
                <FormControl>
                  <Input type="text" placeholder="milliemoo@school.edu" v-bind="componentField" />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </div>
        <div class="rounded-md border border-gray-600/10 p-6">
          <h4 class="text-2xl font-semibold text-primary">Available add-on</h4>
          <div class="flex flex-col gap-4">
            <FormField
              v-slot="{ value, handleChange }"
              type="checkbox"
              name="singleSupplementUpgrade"
            >
              <FormItem class="flex flex-row items-start gap-x-3 space-y-0 py-4">
                <FormControl>
                  <Checkbox :checked="value" @update:checked="handleChange" />
                </FormControl>
                <div class="space-y-6 leading-none">
                  <FormLabel class="cursor-pointer font-bold">Single supplement upgrade</FormLabel>
                  <FormDescription class="text-md font-bold">Price: USD 40</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
            <FormField v-slot="{ value, handleChange }" type="checkbox" name="simCard">
              <FormItem class="flex flex-row items-start gap-x-3 space-y-0 py-4">
                <FormControl>
                  <Checkbox :checked="value" @update:checked="handleChange" />
                </FormControl>
                <div class="space-y-6 leading-none">
                  <FormLabel class="cursor-pointer font-bold">SIM card</FormLabel>
                  <FormDescription class="text-md font-bold">Price: USD 40</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
          </div>
        </div>
        <FormField v-slot="{ value, handleChange }" type="checkbox" name="acceptTermsAndConditions">
          <FormItem class="flex flex-row items-start gap-x-3 space-y-0 py-4">
            <FormControl>
              <Checkbox :checked="value" @update:checked="handleChange" />
            </FormControl>
            <div class="space-y-6 leading-none">
              <FormLabel
                >I have read and agree to TourHero's
                <a class="cursor-pointer text-[#307582] hover:underline" href="#">Terms of Use</a>,
                <a class="cursor-pointer text-[#307582] hover:underline" href="#">Privacy Policy</a
                >, Cancellation Policy and Payment Plan. I also agree to
                <a class="cursor-pointer text-[#307582] hover:underline" href="#"
                  >VAOVA Travel's Terms of Use</a
                >.*</FormLabel
              >
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
        <Button type="submit" class="ml-auto bg-[#D50037]">Confirm and pay</Button>
      </div>
      <div class="flex flex-col gap-4 sm:w-96 lg:w-1/3">
        <div class="overflow-hidden rounded-md border border-gray-600/10">
          <img
            src="https://plus.unsplash.com/premium_photo-1673280731432-9cc09eb20fed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div class="p-6">
            <h4 class="mb-6 text-2xl font-semibold text-primary">Summary</h4>
            <p class="text-sm font-bold uppercase text-muted-foreground">
              1 country, 6 days, 5 nights
            </p>
            <p class="text-lg font-semibold leading-tight">
              City to Seaside: Costa Rica Caribbean Explorer
            </p>
            <p class="mt-2 text-sm font-bold uppercase text-muted-foreground">Travel Dates</p>
            <p class="font-semibold">Jun 14 - Jun 19 2022</p>

            <div class="my-6 border-b border-gray-600/10" />

            <p class="mt-2 text-xs font-bold uppercase text-muted-foreground">Current Payment</p>
            <p class="text-4xl font-bold text-primary">USD 113</p>
          </div>
        </div>
        <div class="rounded-md border border-gray-600/10 p-6">
          <div class="mb-4 flex flex-row items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_206)">
                <path
                  d="M17.25 23.25C20.5637 23.25 23.25 20.5637 23.25 17.25C23.25 13.9363 20.5637 11.25 17.25 11.25C13.9363 11.25 11.25 13.9363 11.25 17.25C11.25 20.5637 13.9363 23.25 17.25 23.25Z"
                  stroke="#307582"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.924 15.506L17.019 19.379C16.9544 19.4649 16.8721 19.5358 16.7777 19.5872C16.6834 19.6386 16.5791 19.6691 16.4719 19.6768C16.3648 19.6845 16.2572 19.6691 16.1565 19.6317C16.0557 19.5943 15.9642 19.5358 15.888 19.46L14.388 17.96"
                  stroke="#307582"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.75 6.75H14.25"
                  stroke="#307582"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.75 11.25H9.75"
                  stroke="#307582"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.75 15.75H7.5"
                  stroke="#307582"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 20.25H2.25C1.85218 20.25 1.47064 20.092 1.18934 19.8107C0.908035 19.5294 0.75 19.1478 0.75 18.75V2.25C0.75 1.85218 0.908035 1.47064 1.18934 1.18934C1.47064 0.908035 1.85218 0.75 2.25 0.75H12.879C13.2765 0.750085 13.6578 0.907982 13.939 1.189L16.811 4.061C17.092 4.3422 17.2499 4.72345 17.25 5.121V7.5"
                  stroke="#307582"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_206">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h4 class="text-2xl font-semibold text-primary">Included</h4>
          </div>
          <ul>
            <li>All accomodations</li>
            <li>All activities described in the itinerary</li>
            <li>Bilingual guides during activities</li>
            <li>Transportation between activities and accommodation (except day 1 and day 5)</li>
            <li>Day 2, 3 and 4 breakfast</li>
            <li>Day 2 and 4 lunch</li>
            <li>Excursion transfers</li>
            <li>Shared occupancy in accommodation</li>
            <li>24/7 guest support</li>
          </ul>
        </div>
        <div class="rounded-md border border-gray-600/10 p-6">
          <h4 class="mb-4 text-2xl font-semibold text-primary">Cancellation policy</h4>
          <div class="mb-2">
            <p class="font-bold">Refunds for deposits</p>
            <p class="leading-tight">
              If you cancel your trip after placing a deposit but before your card on file is
              charged for the full payment, you can request a full refund of your deposit up to 30
              days before the tour departure.
            </p>
          </div>
          <div>
            <p class="font-bold">Refunds for fully-paid trips</p>
            <p class="leading-tight">
              If you cancel your trip after making the full payment, you may change or cancel your
              trip up to 30 days before the tour departure for a refund.
            </p>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>
