import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'search' }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "SearchView" */ '@/views/Search.vue')
    }
  ]
})
