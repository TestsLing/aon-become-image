import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import User from '../views/User.vue'
import Created from '../views/Created.vue'
import Complete from '../views/Complete.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/created',
      name: 'created',
      component: Created
    }, 
    {
      path: '/complete',
      name: 'complete',
      component: Complete
    }
  ]
})

export default router
