import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import TripView from '../views/TripView.vue'
import { getTrip } from '@/lib/api/trips'
import Playground from '@/views/Playground.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/playground',
      name: 'Playground',
      component: Playground
    },
    {
      path: '/trips/:tripId',
      name: 'Trip',
      children: [
        {
          path: '',
          name: 'Trip Details',
          component: TripView
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: CheckoutView
        }
      ]
    }
  ]
})

const appName = 'TourHero (THX)'

const createAppTitle = (x: string) => (x ? `${x} - ${appName}` : appName)

router.beforeEach(async (to, from, next) => {
  if (to.params.tripId) {
    // looks like a code smell
    const trip = await getTrip(to.params.tripId as string)
    if (!trip) {
      document.title = createAppTitle(`Trip not Found!`)
    } else {
      document.title = createAppTitle(trip.name)
    }
  } else if (to.name) {
    document.title = createAppTitle(to.name.toString())
  } else {
    document.title = appName
  }

  next()
})

export default router
