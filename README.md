# Tourhero Assignment 

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Personal Thoughts

## Day 1: Learning Vue3

- https://www.youtube.com/watch?v=1GNsWa_EZdw

## Day 2: Implementing the Front-End

Using components I am familiar with from React
- [ShadCN-Vue](https://www.shadcn-vue.com/): Similar to ShadCN-UI for React
- [TailwindCSS](https://tailwindcss.com/): For easy styling

### Creating the Main Checkout Page

Following the given layout, I created the main page

![](/screenshots/main-checkout-page.png)

### Defining `Trip`

Then, I defined what a trip needs

```ts
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
  name: string
  cost: number
  spotsRemaining?: number
  timeStart?: string // date string
  timeEnd?: string // date string
}
```

To specifically note:
- Since these trips come from all across the world, I included a `currency` in `Trip` to take into the account the possible currencies
- Each trip will have a `startDate`, and last for `durationNights` nights
- `TripAddOn` could possibly have a slot limit and a duration. Hence, introduced a `spotsRemaining`, `timeStart` and `timeEnd`

### Listing Available Trips

Now, I show a list of available trips by defining a few trips of my own.

![](/screenshots/trip-list.png)

Each trip has its own detailed page

![](/screenshots/trip-details.png)

Each trip also links to its own checkout form, which is dynamically populated based on the details from the trip

### Frontend Form Validation and Reactivity

Used `VeeValidate` and `zod` for front-end form validation.
- We would disable an add-on from being selected if `addOn.slotsRemaining === 0`

    ![](/screenshots/no-slots-addon.png)

- We would show an error if `name, lastName, email` was not in a valid format. We would also show an error if terms and conditions were not accepted

    ![](/screenshots/invalid-guest-details.png)

- We would also show an error if 2 add-ons with overlapping timings were selected

    ![](/screenshots/conflicting-addons.png)

For reactivity, I made sure that the price breakdown section reflected the current add-ons that the user has added, and the corresponding total price using `computed`

![](/screenshots/reactive-price-breakdown.png)

Once the form is fully filled out and succesfully submitted, I display a modal and redirect them to the home page

![](/screenshots/trip-purchased.png)

### Dynamic Page Title

Each page should have its own page title. For example, 
- `Home - TourHero` for the home page
- `<trip-name> - TourHero` for a specific trip

Problem: For specific trips, there is only a `tripId` provided, and I want to set the trip name to be the title. So my solution is
- On `router.beforeEach`, I check for a `tripId` param, and if it exists, I fetch the trip and set `document.title = trip.name`. However, this feels like a code smell, because on the route itself I also fetch the trip again
- Something like Nuxt might help with this issue, because they provide a corresponding `Head` tag to help me set the title from the component itself after fetching 

- [Vue JS: Dynamic Page Titles with Vue Router](https://www.youtube.com/watch?v=Pcrzy1f1fK4)

### Improvements for the Future

- Login page to only allow logged-in users to purchase a trip, which would include more pages such as a user info page for purchased trips, changing user information etc.
- Auto-populating the form fields based on logged-in user information
- Different payment methods such as one-time payment, pay-later, pay on-site, installments etc.