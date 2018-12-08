import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load (view) {
  return () => import(/* webpackChunkName: "[request]View" */ `@/views/${view}`)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' }
    },
    {
      path: '/home',
      name: 'Home',
      component: load('Home')
    },
    {
      path: '/search',
      name: 'Search',
      component: load('Search')
    }
  ]
})
