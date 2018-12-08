<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-flex xs12 class="text-xs-left hidden-md-and-up">
        <span class="subheading">
          <v-icon x-large style="transform: rotate(90deg);">subdirectory_arrow_left</v-icon>
          Looking for organizations? Go here!
        </span>
      </v-flex>
      <v-flex xs12 class="text-xs-right hidden-sm-and-down">
        <span class="subheading pr-4">
          Looking for organizations? Go here
          <v-icon x-large style="transform: rotate(-90deg);">subdirectory_arrow_right</v-icon>
        </span>
      </v-flex>
      <v-flex xs12 class="text-xs-center">
        <blockquote class="blockquote">
          &#8220;This app finds organizations in Github the easy way!&#8221;
          <footer>
            <small>
              <em>&mdash; Someone wise...probably.</em>
            </small>
          </footer>
        </blockquote>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    orgSearchInput: '',
    organizationList: []
  }),

  methods: {
    submit: async function () {
      try {
        this.$root.$addToLoader(`Searching for organizations with names similar to '${this.orgSearchInput}'`)
        let response = await this.$axios.get('search/users', {
          params: {
            q: this.orgSearchInput,
            type: 'org'
          }
        })
        this.organizationList = response.data.items
        if (this.organizationList.length === 0) this.$root.$addToSnackbar(`No organization found for '${this.orgSearchInput}'`, 'error')
      } catch (error) {
        this.$root.$addToSnackbar(error.response.data.message, 'error')
      } finally {
        this.$root.$removeFromLoader(`Searching for organizations with names similar to '${this.orgSearchInput}'`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
