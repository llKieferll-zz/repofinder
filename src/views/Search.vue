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
        @resultsFound="updateOrganizationList"
        @searchError="$root.$addToSnackbar($event, 'error')"
        @searchEnded="$root.$removeFromLoader(`Searching for organizations with names similar to '${$event}''`)"
      />
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    organizationList: []
  }),

  methods: {
    updateOrganizationList: function ({ results, searchInput }) {
      console.log(results)
      if (results.length === 0) this.$root.$addToSnackbar(`No organization found for '${searchInput}'`, 'error')
      else this.organizationList = results
    }
  },

  components: {
    OrganizationSearchInput: () => import(/* webpackChunkName: "[request]Component" */ '@/components/OrganizationSearchInput')
  }
}
</script>

<style lang="scss" scoped>
</style>
