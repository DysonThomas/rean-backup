import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from "../views/Profile.vue"
import cart from "../components/AddToCart.vue"

// import { metadata } from 'core-js/fn/reflect'
import {fb} from '../firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router
