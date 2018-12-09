<template>
  <v-layout
    justify-start
    column
  >
    <v-card flat color="transparent">
      <v-card-title>
        <v-layout column>
          <v-slide-y-transition>
            <OrganizationInfoCard v-if="organization" :organization="organization" />
          </v-slide-y-transition>
          <v-divider v-if="organization" light />
          <v-slide-y-transition>
            <span
              v-if="!!repositoryList.length"
              :class="$vuetify.breakpoint.smAndDown ? 'subheading' : 'display-1'"
              class=" pt-4 text-xs-center"
            >
              <v-icon
                :size="$vuetify.breakpoint.smAndDown ? '14px' : '28px'"
                style="transform: rotate(90deg);"
              >
                subdirectory_arrow_right
              </v-icon>
              Repositories
              <v-icon
                :size="$vuetify.breakpoint.smAndDown ? '14px' : '28px'"
                style="transform: rotate(-90deg);"
              >
                subdirectory_arrow_left
              </v-icon>
            </span>
          </v-slide-y-transition>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <RepositoryList :list="repositoryList" />
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    organization: null,
    repositoryList: [],
    pages: 0
  }),

  props: {
    org: {
      type: String,
      required: true
    }
  },

  async mounted () {
    try {
      this.$root.$addToLoader(`Looking for organization called "${this.org}"`)
      const orgResponse = await this.$axios.get(`orgs/${this.org}`)
      this.organization = orgResponse.data
      let repositoriesResponse = {}
      if (orgResponse.data.has_repository_projects) {
        repositoriesResponse = await this.$axios.get(`search/repositories`, {
          params: {
            q: `user:${this.org} fork:true`,
            sort: 'stars',
            order: 'desc'
          }
        })
      }

      this.repositoryList = repositoriesResponse.data.items.map(r => {
        return {
          name: r.name,
          description: r.description,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language ? r.language : 'None'
        }
      })
    } catch (error) {
      if (error.response.status === 404) {
        this.$root.$addToSnackbar(`There is no organization named "${this.org}". Try searching for a similar name.`, 'error')
        this.$router.push({ name: 'Search' })
      } else {
        this.$root.$addToSnackbar(error.response.data.message, 'error')
      }
    } finally {
      this.$root.$removeFromLoader(`Looking for organization called "${this.org}"`)
    }
  },

  components: {
    OrganizationInfoCard: () => import('@/components/organization/OrganizationInfoCard'),
    RepositoryList: () => import('@/components/repository/RepositoryList')
  }
}
</script>

<style lang="scss" scoped>
</style>
