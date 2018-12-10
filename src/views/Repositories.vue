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
        key="pagination"
      >
        <v-pagination
          v-model="page"
          class="pb-4"
          :length="totalPages"
        />
      </div>
      <div
        v-if="!!repositoryList.length"
        class="pb-4"
        key="controls"
      >
        <v-divider />
        <!-- For each event emmited, we fetch the repositories while setting the correspondent variable -->
        <RepositoryListSortControl
          @changeSort="fetchRepositories(organization, 1, sort = $event, order, language)"
          @changeOrder="fetchRepositories(organization, 1, sort, order = $event, language)"
          @changeLanguage="fetchRepositories(organization, 1, sort, order, language = $event)"
          :organization="organization"
          :repositoryList="repositoryList"
          class="pb-3"
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
    <v-slide-y-transition group leave-absolute>
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
    </v-slide-y-transition>
  </div>
</template>

<script>
import parseLinkHeader from 'parse-link-header'

export default {
  data: () => ({
    repositoryList: [],
    totalPages: 1,
    page: 1,
    sort: 'stars',
    order: 'desc',
    language: ''
  }),

  props: {
    organization: {
      type: Object,
      required: true
    }
  },

  methods: {
    fetchRepositories: async function (organization, page, sort = this.sort, order = this.order, language = this.language) {
      try {
        this.$root.$addToLoader(`Fetching repositories of "${organization.name}"`)
        let repositoriesResponse = {}
        if (organization.has_repository_projects) {
          repositoriesResponse = await this.$axios.get(`search/repositories`, {
            params: {
              q: `user:${organization.login} fork:true${language ? ' language:' + language : ''}`,
              sort: sort,
              order: order,
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
    RepositoryList: () => import('@/components/repository/RepositoryList'),
    RepositoryListSortControl: () => import('@/components/repository/RepositoryListSortControl')
  }
}
</script>

<style lang="scss" scoped>
</style>
