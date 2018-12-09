<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      justify-start
      column
    >
      <v-slide-y-transition mode="out-in">
        <div
          v-if="showSearchInput"
          class="text-xs-center"
          key="search"
        >
          <OrganizationSearchInput
            @searchStarted="$root.$addToLoader(`Searching for organizations with names similar to '${$event}'`)"
            @responseReceived="updateOrganizationList"
            @searchError="$root.$addToSnackbar($event.response.data.message, 'error')"
            @searchEnded="$root.$removeFromLoader(`Searching for organizations with names similar to '${$event}''`)"
          />
          <span
            v-show="!!organizationList.length"
            class="subheading"
          >
            Or filter results here <v-icon small>arrow_forward</v-icon>
            <v-btn
              color="primary"
              icon
              @click="showSearchInput = false"
            >
              <v-icon>filter_list</v-icon>
            </v-btn>
          </span>
        </div>
        <div
          v-else
          class="text-xs-center"
          key="filter"
        >
          <FilterInput @input="filterInput = $event" />
          <span class="subheading">
            Or search again here <v-icon small>arrow_forward</v-icon>
            <v-btn
              color="primary"
              icon
              @click="filterInput = ''; showSearchInput = true"
            >
              <v-icon>search</v-icon>
            </v-btn>
          </span>
        </div>
      </v-slide-y-transition>
        <v-layout
          justify-start
          column
        >
          <v-divider class="my-3" />
          <OrganizationList :list="filteredOrganizationList" />
        </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    showSearchInput: true,
    organizationList: [],
    pages: 0,
    filterInput: ''
  }),

  computed: {
    filteredOrganizationList: function () {
      return this.organizationList.filter(org => org.login.toLowerCase().includes(this.filterInput.toLowerCase()))
    }
  },

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
    OrganizationSearchInput: () => import(/* webpackChunkName: "[request]Component" */ '@/components/organization/OrganizationSearchInput'),
    OrganizationList: () => import(/* webpackChunkName: "[request]Component" */ '@/components/organization/OrganizationList'),
    FilterInput: () => import(/* webpackChunkName: "[request]Component" */ '@/components/filters/FilterInput')
  }
}
</script>

<style lang="scss" scoped>
</style>
