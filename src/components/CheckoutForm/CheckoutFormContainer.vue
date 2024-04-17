<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
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
import { bookTrip, type Trip } from '@/lib/api/trips'
import formatTripDuration from '@/lib/formatTripDuration'
import { toTypedSchema } from '@vee-validate/zod'
import { formatDate } from '@vueuse/core'
import { CircleCheckBig, LoaderCircle, LockIcon, Umbrella } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import generateCheckoutSchema from './generateCheckoutSchema'

const { trip } = defineProps<{ trip: Trip }>()

const tripDuration = computed(() =>
  formatTripDuration(new Date(trip.startDate), trip.durationNights)
)

const formSchema = toTypedSchema(generateCheckoutSchema(trip))

const { handleSubmit, values } = useForm({
  validationSchema: formSchema
})

const isSubmitting = ref(false)
const isSuccess = ref(false)

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true

  const response = await bookTrip(values)

  if (response.success) {
    isSuccess.value = true
  } else {
    console.error('An error has occurred in submitting the form')
  }

  isSubmitting.value = false
})

const selectedAddOnsCost = computed(() => {
  let addOnsCost = 0
  trip.addOns.forEach((addOn) => {
    if (values.addOns?.[addOn.name]) {
      addOnsCost += addOn.cost
    }
  })

  return addOnsCost
})

const totalCost = computed(() => {
  let currentCost = trip.cost

  trip.addOns.forEach((addOn) => {
    if (values.addOns?.[addOn.name]) {
      currentCost += addOn.cost
    }
  })
  return currentCost
})
</script>

<template>
  <h2 class="mb-8 text-2xl font-bold">Checkout</h2>
  <form class="flex w-full flex-col-reverse gap-4 sm:flex-row" @submit.prevent="onSubmit">
    <div class="flex w-full flex-col gap-4">
      <div class="rounded-md border p-6">
        <h4 class="mb-4 text-2xl font-semibold text-primary">Guest details</h4>
        <div class="flex flex-col justify-between gap-4 lg:flex-row">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem class="flex w-full flex-col justify-end">
              <div class="h-full">
                <FormLabel class="text-xs font-bold uppercase text-muted-foreground"
                  >Name</FormLabel
                >
                <FormDescription class="mt-0 text-xs font-bold text-muted-foreground"
                  >(as per travel document)
                </FormDescription>
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
                  >(as per travel document)
                </FormDescription>
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
      <div class="rounded-md border p-6">
        <h4 class="text-2xl font-semibold text-primary">Available add-on(s)</h4>
        <div class="flex flex-col gap-4">
          <div v-if="trip.addOns.length === 0">
            <p class="mt-2 text-xl font-semibold text-muted-foreground">No add-ons available</p>
          </div>
          <FormField
            v-else
            v-for="addOn in trip.addOns"
            :key="addOn.name"
            v-slot="{ value, handleChange }"
            type="checkbox"
            :name="`addOns.${addOn.name}`"
          >
            <FormItem
              class="flex flex-row items-start gap-x-3 space-y-0 py-4"
              :class="{
                'pointer-events-none opacity-50': addOn.spotsRemaining === 0
              }"
            >
              <FormControl>
                <Checkbox
                  :checked="value"
                  @update:checked="handleChange"
                  :disabled="addOn.spotsRemaining === 0"
                />
              </FormControl>
              <div class="space-y-6 leading-none">
                <FormLabel class="cursor-pointer font-bold"
                  >{{ addOn.name }}
                  {{
                    addOn.timeEnd && addOn.timeStart
                      ? `(${formatDate(new Date(addOn.timeStart), 'MMM DD, YYYY hh:mm A')} - ${formatDate(
                          new Date(addOn.timeEnd),
                          'MMM DD, YYYY hh:mm A'
                        )})`
                      : ''
                  }}
                  {{ addOn.spotsRemaining === 0 ? '[No slots remaining]' : '' }}</FormLabel
                >
                <FormDescription class="text-md font-bold">
                  Price: {{ trip.currency }} {{ addOn.cost }}
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          </FormField>
        </div>
      </div>
      <div class="rounded-md border p-6">
        <h4 class="mb-4 text-2xl font-semibold text-primary">Price Breakdown</h4>
        <ul class="flex flex-col gap-4">
          <li class="flex justify-between">
            <p>Base package</p>
            <p>{{ trip.currency }} {{ trip.cost }}</p>
          </li>
          <li v-if="selectedAddOnsCost > 0" class="flex justify-between">
            <p>Add-ons</p>
            <p>{{ trip.currency }} {{ selectedAddOnsCost }}</p>
          </li>
          <li class="border-t"></li>
          <li class="flex justify-between font-bold">
            <p>Total due</p>
            <p class="text-lg">{{ trip.currency }} {{ totalCost }}</p>
          </li>
        </ul>
      </div>
      <FormField v-slot="{ value, handleChange }" type="checkbox" name="acceptTermsAndConditions">
        <FormItem class="flex flex-row items-start gap-x-3 space-y-0 py-4">
          <FormControl>
            <Checkbox
              :checked="value"
              @update:checked="handleChange"
              id="agreeToTermsAndConditions"
            />
          </FormControl>
          <div class="space-y-6 leading-none">
            <FormLabel class="cursor-pointer" for="agreeToTermsAndConditions"
              >I have read and agree to TourHero's
              <a class="text-[#307582] hover:underline" href="#">Terms of Use</a>,
              <a class="text-[#307582] hover:underline" href="#">Privacy Policy</a>, Cancellation
              Policy and Payment Plan. I also agree to
              <a class="text-[#307582] hover:underline" href="#">VAOVA Travel's Terms of Use</a>.*
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>
      <Button
        type="submit"
        class="ml-auto flex items-center gap-2 bg-red-600 hover:bg-red-700"
        :disabled="isSubmitting || isSuccess"
      >
        <div v-if="isSubmitting" class="flex items-center gap-2">
          <LoaderCircle class="animate-spin stroke-white" />
          <span>Loading...</span>
        </div>
        <div v-else-if="isSuccess" class="flex items-center gap-2">
          <CircleCheckBig class="h-5 w-5" />
          <span>Success</span>
        </div>
        <div v-else class="flex items-center gap-2">
          <LockIcon class="h-5 w-5 stroke-1" />
          <span>Confirm and pay</span>
        </div>
      </Button>
    </div>
    <div class="flex flex-col gap-4 sm:w-96 lg:w-1/3">
      <div class="overflow-hidden rounded-md border">
        <img :src="trip.coverImage" alt="Cover image" />
        <div class="p-6">
          <h4 class="mb-6 text-2xl font-semibold text-primary">Summary</h4>
          <p class="text-sm font-bold uppercase text-muted-foreground">
            {{ trip.durationNights + 1 }} days, {{ trip.durationNights }} nights
          </p>
          <p class="text-lg font-semibold leading-tight">
            {{ trip.name }}
          </p>
          <p class="mt-4 text-sm font-bold uppercase text-muted-foreground">Travel Dates</p>
          <p class="font-semibold">{{ tripDuration }}</p>

          <div v-if="selectedAddOnsCost > 0">
            <p class="mt-4 text-sm font-bold uppercase text-muted-foreground">Add-on price</p>
            <p class="font-semibold">{{ trip.currency }} {{ selectedAddOnsCost }}</p>
          </div>

          <div class="my-6 border-b" />

          <p class="mt-4 text-xs font-bold uppercase text-muted-foreground">Current Payment</p>
          <p class="text-4xl font-bold text-primary">{{ trip.currency }} {{ totalCost }}</p>
        </div>
      </div>
      <div class="rounded-md border p-6">
        <div class="mb-4 flex flex-row items-center gap-2">
          <img src="@/assets/icons/PaperWithCheck.svg" alt="" />
          <h4 class="text-2xl font-semibold text-primary">Included</h4>
        </div>
        <ul class="flex flex-col gap-4">
          <li v-for="(item, index) in trip.included" :key="index" class="flex gap-2">
            <CircleCheckBig class="shrink-0 stroke-green-700" />{{ item }}
          </li>
        </ul>
      </div>
      <div class="rounded-md border p-6">
        <div class="mb-4 flex flex-row items-center gap-2">
          <Umbrella class="stroke-primary" />
          <h4 class="text-2xl font-semibold text-primary">Cancellation policy</h4>
        </div>

        <div class="mb-2">
          <p class="font-bold">Refunds for deposits</p>
          <p class="leading-tight">
            If you cancel your trip after placing a deposit but before your card on file is charged
            for the full payment, you can request a full refund of your deposit up to 30 days before
            the tour departure.
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
  <AlertDialog :open="isSuccess">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Successfully reserved your slot!</AlertDialogTitle>
        <AlertDialogDescription>
          <p>Congratulations! You have successfully reserved your personal slot for the trip!</p>
          <pre class="mt-2 w-full whitespace-pre-line rounded-md bg-slate-950 p-4">
            <code class="text-white whitespace-pre">{{ JSON.stringify(values, null, 2) }}</code>
          </pre>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction as-child>
          <RouterLink to="/">Go back home</RouterLink>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
