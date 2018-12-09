<template>
  <div class="text-xs-center">
    <v-slide-y-transition>
      <span
        v-if="!!branchList.length"
        :class="$vuetify.breakpoint.smAndDown ? 'subheading' : 'display-1'"
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
        <v-spacer />
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
  </div>
</template>

<script>
export default {
  data: () => ({
    branchList: [],
    pages: 0
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

  async mounted () {
    try {
      this.$root.$addToLoader(`Looking for branches of "${this.repository}"`)
      let branchListResponse = {}
      if (this.organization.has_repository_projects) {
        branchListResponse = await this.$axios.get(`repos/${this.organization.name}/${this.repository}/branches`)
      }
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
    } catch (error) {
      if (error.response.status === 404) {
        this.$root.$addToSnackbar(`No branches found in "${this.repository}". Is that even the correct repo name?`, 'error')
      } else {
        this.$root.$addToSnackbar(error.response.data.message, 'error')
      }
    } finally {
      this.$root.$removeFromLoader(`Looking for branches of "${this.repository}"`)
    }
  },

  components: {
    BranchList: () => import('@/components/branch/BranchList')
  }
}
</script>

<style>

</style>
