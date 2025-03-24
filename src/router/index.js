import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ShowDetails from '../views/ShowDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/show/:id',
      name: 'show-details',
      component: ShowDetails,
      props: true
    }
  ]
})

export default router
