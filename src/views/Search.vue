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
            @search="fetchOrganizations(query = $event, 1)"
          />
          <span
            v-show="!!organizationList.length"
            class="subheading"
          >
            Filter results here <v-icon small>arrow_forward</v-icon>
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
            Search again here <v-icon small>arrow_forward</v-icon>
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
      <v-slide-y-transition leave-absolute group class="text-xs-center">
        <div
          v-if="!!organizationList.length"
          key="divider"
        >
          <v-divider class="my-3" />
        </div>
      </v-slide-y-transition>
      <v-slide-y-transition leave-absolute group class="text-xs-center">
        <div
          v-if="!!organizationList.length"
          key="pagination"
        >
          <v-pagination
            v-model="page"
            class="pb-4"
            :length="totalPages"
          />
        </div>
        <span
          v-if="!!organizationList.length"
          :class="$vuetify.breakpoint.smAndDown ? 'subheading' : 'display-1'"
          key="repositories"
        >
          <v-icon
            :size="$vuetify.breakpoint.smAndDown ? '14px' : '28px'"
            style="transform: rotate(90deg);"
          >
            subdirectory_arrow_right
          </v-icon>
          Organizations
          <v-icon
            :size="$vuetify.breakpoint.smAndDown ? '14px' : '28px'"
            style="transform: rotate(-90deg);"
          >
            subdirectory_arrow_left
          </v-icon>
        </span>
        <div
          v-if="!!organizationList.length"
          key="list"
        >
          <OrganizationList :list="filteredOrganizationList" />
        </div>
      </v-slide-y-transition>
    </v-layout>
  </v-container>
</template>

<script>
import parseLinkHeader from 'parse-link-header'

export default {
  data: () => ({
    showSearchInput: true,
    organizationList: [],
    totalPages: 1,
    page: 1,
    filterInput: '',
    query: ''
  }),

  computed: {
    filteredOrganizationList: function () {
      return this.organizationList.filter(org => org.login.toLowerCase().includes(this.filterInput.toLowerCase()))
    }
  },

  methods: {
    fetchOrganizations: async function (query, page) {
      try {
        this.$root.$addToLoader(`Searching for organizations with names similar to "${query}"`)
        let organizationsResponse = await this.$axios.get('search/users', {
          params: {
            q: `${query} type:org`,
            sort: 'repositories',
            page: page
          }
        })
        if (organizationsResponse.data.items.length === 0) {
          this.$root.$addToSnackbar(`No organization found for '${query}'`, 'error')
        } else {
          if (organizationsResponse.headers.link) {
            let parsed = parseLinkHeader(organizationsResponse.headers.link)
            if (parsed.last) this.totalPages = Number(parsed.last.page)
          }
          this.organizationList = organizationsResponse.data.items
        }
      } catch (error) {
        this.$root.$addToSnackbar(error.response.data.message, 'error')
      } finally {
        this.$root.$removeFromLoader(`Searching for organizations with names similar to "${query}"`)
      }
    }
  },

  watch: {
    page: {
      handler: function (newPage) {
        this.fetchOrganizations(this.query, newPage)
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
