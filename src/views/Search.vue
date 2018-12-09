<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      justify-start
      column
    >
      <OrganizationSearchInput
        @searchStarted="$root.$addToLoader(`Searching for organizations with names similar to '${$event}'`)"
        @responseReceived="updateOrganizationList"
        @searchError="$root.$addToSnackbar($event.response.data.message, 'error')"
        @searchEnded="$root.$removeFromLoader(`Searching for organizations with names similar to '${$event}''`)"
      />
      <v-divider v-show="!!organizationList.length" class="my-3" />
      <OrganizationList v-show="!!organizationList.length" :list="organizationList" />
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    organizationList: [],
    pages: 0
  }),

  methods: {
    updateOrganizationList: function ({ response, searchInput }) {
      if (response.data.items.length === 0) this.$root.$addToSnackbar(`No organization found for '${searchInput}'`, 'error')
      else {
        this.pages = response.data.total_count > 1020 ? 34 : Math.ceil(response.data.total_count / 30)
        this.organizationList = response.data.items
      }
    }
  },

  components: {
    OrganizationSearchInput: () => import(/* webpackChunkName: "[request]Component" */ '@/components/OrganizationSearchInput'),
    OrganizationList: () => import(/* webpackChunkName: "[request]Component" */ '@/components/OrganizationList')
  }
}
</script>

<style lang="scss" scoped>
</style>
