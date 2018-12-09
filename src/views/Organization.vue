<template>
  <v-layout
    justify-start
    column
  >
    <v-card
      flat
      color="transparent"
    >
      <v-card-title>
        <v-layout column>
          <v-slide-y-transition>
            <OrganizationInfoCard
              v-if="organization"
              :organization="organization"
            />
          </v-slide-y-transition>
          <v-divider
            v-if="organization"
            light
          />
        </v-layout>
      </v-card-title>
      <v-card-text>
        <router-view
          v-if="organization"
          :organization="organization"
        />
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    organization: null
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
    OrganizationInfoCard: () => import('@/components/organization/OrganizationInfoCard')
  }
}
</script>

<style lang="scss" scoped>
</style>
