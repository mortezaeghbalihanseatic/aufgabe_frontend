import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import QuotesView from '../views/QuotesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 
   
    {
      path: '/',
      name:'login',
      component: LoginView
    },
    {
      path: '/quotes',
      name:'quotes',
      component: QuotesView
    }

  ]
})

export default router
