<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      justify-start
      align-center
      column
    >
      Filter
      <v-divider class="my-3" />
      List
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
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
      this.$root.$addToLoader(`Looking for ${this.org} organization`)
      let res = await this.$axios.get(`orgs/${this.org}`)
      console.log(res)
    } catch (error) {
      if (error.response.status === 404) this.$root.$addToSnackbar(`There is no organization named "${this.org}". Try looking for it in the search page.`, 'error')
      else this.$root.$addToSnackbar(error.response.data.message, 'error')
    } finally {
      this.$root.$removeFromLoader(`Looking for ${this.org} organization`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
