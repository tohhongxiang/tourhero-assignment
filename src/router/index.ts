import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import TripView from '../views/TripView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/trips/:tripId',
      name: 'specific-trip',
      children: [
        {
          path: '',
          name: 'specific-trip-details',
          component: TripView
        },
        {
          path: 'checkout',
          name: 'specific-trip-checkout',
          component: CheckoutView
        }
      ]
    }
  ]
})

export default router
