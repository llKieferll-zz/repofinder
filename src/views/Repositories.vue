<template>
  <div class="text-xs-center">
    <v-slide-y-transition>
      <span
        v-if="!!repositoryList.length"
        :class="$vuetify.breakpoint.smAndDown ? 'subheading' : 'display-1'"
        class=" pt-4"
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
    <RepositoryList :list="repositoryList" />
  </div>
</template>

<script>
export default {
  data: () => ({
    repositoryList: [],
    pages: 0
  }),

  props: {
    organization: {
      type: Object,
      required: true
    }
  },

  async mounted () {
    try {
      this.$root.$addToLoader(`Looking for repositories of "${this.organization.name}"`)
      let repositoriesResponse = {}
      if (this.organization.has_repository_projects) {
        repositoriesResponse = await this.$axios.get(`search/repositories`, {
          params: {
            q: `user:${this.organization.login} fork:true`,
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
        this.$root.$addToSnackbar(`Organization "${this.organization.name}" has no repositories.`, 'error')
      } else {
        this.$root.$addToSnackbar(error.response.data.message, 'error')
      }
    } finally {
      this.$root.$removeFromLoader(`Looking for organization called "${this.org}"`)
    }
  },

  components: {
    RepositoryList: () => import('@/components/repository/RepositoryList')
  }
}
</script>

<style>

</style>
