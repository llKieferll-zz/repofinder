<template>
  <v-layout column align-center>
    <OrganizationListSortControl v-show="!!list.length" @change="propertyToSort = $event"/>
    <v-container v-bind="{ [`grid-list-${$vuetify.breakpoint.name}`]: true }" fluid>
      <v-slide-y-transition
        group
        appear
        leave-absolute
        mode="in-out"
        class="layout row wrap justify-center"
        tag="div"
      >
        <v-flex
          v-for="(organization, index) in sortedList"
          class="pa-2"
          xs12
          sm6
          md3
          :key="index"
        >
          <OrganizationListItem :item="organization" />
        </v-flex>
      </v-slide-y-transition>
    </v-container>
  </v-layout>
</template>

<script>
export default {

  data: () => ({
    propertyToSort: 'score'
  }),

  props: {
    list: {
      type: Array,
      required: true
    }
  },

  computed: {
    sortedList: function () {
      if (this.propertyToSort === 'login') return this.list.slice().sort((a, b) => a.login.toLowerCase().localeCompare(b.login.toLowerCase()))
      if (this.propertyToSort === 'score') return this.list.slice().sort((a, b) => a.score - b.score)
      return this.list.slice().sort((a, b) => a.score - b.score)
    }
  },

  components: {
    OrganizationListItem: () => import(/* webpackChunkName: "[request]Component" */ '@/components/organization/OrganizationListItem'),
    OrganizationListSortControl: () => import(/* webpackChunkName: "[request]Component" */ '@/components/organization/OrganizationListSortControl')
  }
}
</script>

<style lang="scss" scoped>
</style>
