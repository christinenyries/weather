import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlaceView from '../views/PlaceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home' }
    },
    {
      path: '/weather/:id',
      name: 'place',
      component: PlaceView,
      meta: { title: 'Weather' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.query.name || to.meta.title} | The Local Weather`
  next()
})

export default router
