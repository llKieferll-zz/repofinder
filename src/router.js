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
    },
    {
      path: '/organization',
      component: load('OrganizationRouteWrapper'),
      children: [
        {
          path: '',
          name: 'OrganizationEmpty',
          component: load('OrganizationEmpty')
        },
        {
          path: ':org',
          component: load('Organization'),
          props: true,
          children: [
            {
              path: '',
              name: 'Repositories',
              component: load('Repositories')
            },
            {
              path: ':repository',
              name: 'Repository',
              component: load('Repository'),
              props: true
            }
          ]
        }
      ]
    }
  ]
})
