<template>
  <div class="text-xs-center">
    <v-slide-y-transition leave-absolute group>
      <div
        v-if="!!branchList.length"
        key="back"
      >
        <v-tooltip top>
          <v-btn
            icon
            slot="activator"
            color="primary"
            :to="{ name: 'Repositories', params: {org: organization.login }}"
          >
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <span>Back to repositories</span>
        </v-tooltip>
      </div>
      <div
        v-if="!!branchList.length"
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
        v-if="!!branchList.length"
        key="pagination"
      >
        <v-pagination
          v-model="page"
          class="pb-4"
          :length="totalPages"
        />
      </div>
      <span
        v-if="!!branchList.length"
        :class="$vuetify.breakpoint.smAndDown ? 'subheading' : 'display-1'"
        key="branches"
      >
        <v-icon
          style="transform: rotate(90deg);"
          :size="$vuetify.breakpoint.smAndDown ? '14px' : '28px'"
        >
          subdirectory_arrow_right
        </v-icon>
        Branches
        <v-icon
          style="transform: rotate(-90deg);"
          :size="$vuetify.breakpoint.smAndDown ? '14px' : '28px'"
        >
          subdirectory_arrow_left
        </v-icon>
      </span>
    </v-slide-y-transition>
    <BranchList
      :list="branchList"
      class="pt-4"
    />
    <v-slide-y-transition leave-absolute group>
      <div
        v-if="!!branchList.length"
        key="pagination"
      >
        <v-pagination
          v-model="page"
          class="pt-4"
          :length="totalPages"
        />
      </div>
      <div
        v-if="!!branchList.length"
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
    branchList: [],
    totalPages: 1,
    page: 1
  }),

  props: {
    organization: {
      type: Object,
      required: true
    },
    repository: {
      type: String,
      required: true
    }
  },

  methods: {
    fetchBranches: async function (organization, repository, page) {
      try {
        this.$root.$addToLoader(`Fetching branches of "${repository}"`)
        let branchListResponse = {}
        if (organization.has_repository_projects) {
          branchListResponse = await this.$axios.get(`repos/${organization.name}/${repository}/branches`, {
            params: {
              page: page
            }
          })
          if (branchListResponse.headers.link) {
            let parsed = parseLinkHeader(branchListResponse.headers.link)
            if (parsed.last) this.totalPages = Number(parsed.last.page)
          }
        }
        if (process.env.VUE_APP_OAUTH_TOKEN) {
          this.$root.$addToLoader(`Fetching further information from each branch`)
          const mappedPromises = branchListResponse.data.map(async (b) => {
            const lastCommit = await this.$axios.get(b.commit.url)
            return {
              name: b.name,
              commit: {
                sha: lastCommit.data.sha,
                author: lastCommit.data.commit.author.name,
                message: lastCommit.data.commit.message
              }
            }
          })
          this.branchList = await Promise.all(mappedPromises)
        } else {
          this.branchList = branchListResponse.data.map((b) => {
            return {
              name: b.name,
              commit: {
                sha: b.commit.sha,
                author: null,
                message: null
              }
            }
          })
        }
      } catch (error) {
        if (error.response.status === 404) {
          this.$root.$addToSnackbar(`No branches found in "${repository}". Is that even the correct repo name?`, 'error')
        } else {
          this.$root.$addToSnackbar(error.response.data.message, 'error')
        }
      } finally {
        this.$root.$removeFromLoader(`Fetching further information from each branch`)
        this.$root.$removeFromLoader(`Fetching branches of "${repository}"`)
      }
    }
  },

  mounted () {
    this.fetchBranches(this.organization, this.repository, 1)
  },

  watch: {
    page: {
      handler: function (newPage) {
        this.fetchBranches(this.organization, this.repository, newPage)
      }
    }
  },

  components: {
    BranchList: () => import('@/components/branch/BranchList')
  }
}
</script>

<style lang="scss" scoped>
</style>
