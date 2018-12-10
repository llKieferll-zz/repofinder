<template>
  <div class="text-xs-center">
    <v-slide-y-transition leave-absolute>
      <div v-if="!!repositoryList.length">
        <span
          class="subheading"
          key="1"
        >
          Don't forget to check more pages
          <v-icon>mood</v-icon>
        </span>
      </div>
    </v-slide-y-transition>
    <v-slide-y-transition>
      <div v-if="!!repositoryList.length">
        <v-pagination
          v-model="page"
          class="pb-4"
          :length="totalPages"
        />
      </div>
    </v-slide-y-transition>
    <v-slide-y-transition>
      <span
        v-if="!!repositoryList.length"
        :class="$vuetify.breakpoint.smAndDown ? 'subheading' : 'display-1'"
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
    <v-slide-y-transition>
      <div v-if="!!repositoryList.length">
        <v-pagination
          v-model="page"
          class="pt-4"
          :length="totalPages"
        />
      </div>
    </v-slide-y-transition>
    <v-slide-y-transition leave-absolute>
      <div v-if="!!repositoryList.length">
        <span
          class="subheading"
          key="1"
        >
          Yup, pages here too for your comfort
          <v-icon>mood</v-icon>
        </span>
      </div>
    </v-slide-y-transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    repositoryList: [],
    totalPages: 0,
    page: 1
  }),

  props: {
    organization: {
      type: Object,
      required: true
    }
  },

  methods: {
    fetchRepositories: async function (organization, page) {
      try {
        this.$root.$addToLoader(`Fetching repositories of "${organization.name}"`)
        let repositoriesResponse = {}
        if (organization.has_repository_projects) {
          repositoriesResponse = await this.$axios.get(`search/repositories`, {
            params: {
              q: `user:${organization.login} fork:true`,
              sort: 'stars',
              order: 'desc',
              page: page
            }
          })
        }
        this.totalPages = Math.min(Math.ceil(repositoriesResponse.data.total_count / 30), 34)
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
          this.$root.$addToSnackbar(`Organization "${organization.name}" has no repositories.`, 'error')
        } else {
          this.$root.$addToSnackbar(error.response.data.message, 'error')
        }
      } finally {
        this.$root.$removeFromLoader(`Fetching repositories of "${organization.name}"`)
      }
    }
  },

  async mounted () {
    this.fetchRepositories(this.organization, 1)
  },

  watch: {
    page: {
      handler: function (newPage) {
        this.fetchRepositories(this.organization, newPage)
      }
    }
  },

  components: {
    RepositoryList: () => import('@/components/repository/RepositoryList')
  }
}
</script>

<style>

</style>
