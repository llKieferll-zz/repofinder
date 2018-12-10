<template>
  <div class="text-xs-center">
    <v-slide-y-transition leave-absolute group>
      <div
        v-if="!!repositoryList.length"
        key="back"
      >
        <v-tooltip top>
          <v-btn
            icon
            slot="activator"
            color="primary"
            :to="{ name: 'Search' }"
          >
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <span>Back to search</span>
        </v-tooltip>
      </div>
      <div
        v-if="!!repositoryList.length"
        key="tip"
      >
        <span
          class="subheading"
          key="1"
        >
          Don't forget to check more pages
          <v-icon>mood</v-icon>
        </span>
      </div>
      <div
        v-if="!!repositoryList.length"
        key="pagination"
      >
        <v-pagination
          v-model="page"
          class="pb-4"
          :length="totalPages"
        />
      </div>
      <span
        v-if="!!repositoryList.length"
        :class="$vuetify.breakpoint.smAndDown ? 'subheading' : 'display-1'"
        key="repositories"
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
    <RepositoryList
      :list="repositoryList"
      class="pt-4"
    />
    <v-slide-y-transition group>
      <div
        v-if="!!repositoryList.length"
        key="pagination"
      >
        <v-pagination
          v-model="page"
          class="pt-4"
          :length="totalPages"
        />
      </div>
      <div
        v-if="!!repositoryList.length"
        key="tip"
      >
        <span class="subheading">
          Yup, pages here too for your comfort
          <v-icon>mood</v-icon>
        </span>
      </div>
    </v-slide-y-transition>
  </div>
</template>

<script>
import parseLinkHeader from 'parse-link-header'

export default {
  data: () => ({
    repositoryList: [],
    totalPages: 1,
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
        if (repositoriesResponse.headers.link) {
          let parsed = parseLinkHeader(repositoriesResponse.headers.link)
          if (parsed.last) this.totalPages = Number(parsed.last.page)
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
          this.$root.$addToSnackbar(`Organization "${organization.name}" has no repositories.`, 'error')
        } else {
          this.$root.$addToSnackbar(error.response.data.errors[0].message, 'error')
        }
      } finally {
        this.$root.$removeFromLoader(`Fetching repositories of "${organization.name}"`)
      }
    }
  },

  mounted () {
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

<style lang="scss" scoped>
</style>
