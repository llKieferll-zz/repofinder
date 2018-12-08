<template>
  <v-form @submit.prevent="submit">
    <v-layout justify-center>
      <v-flex
        xs12
        sm10
        md8
        lg6
        xl4
        class="text-xs-center"
      >
        <v-text-field
          solo
          single-line
          v-model="orgSearchInput"
          label="Search for organizations"
          append-icon="search"
          @click:append="submit"
          @focus="useSearchTip = false"
          @blur="useSearchTip = true"
        />
        <v-slide-y-transition leave-absolute>
          <span
            v-if="useSearchTip && !orgSearchInput.length && !performedSearch"
            class="subheading"
            key="1"
          >
            <v-icon style="transform: rotate(90deg);">subdirectory_arrow_left</v-icon>
            Use this search bar!
            <v-icon style="transform: rotate(-90deg);">subdirectory_arrow_right</v-icon>
          </span>
          <span
            v-if="!useSearchTip && !orgSearchInput.length && !performedSearch"
            class="subheading"
            key="2"
          >
            <v-icon>keyboard</v-icon>
            Type the name of an organization!
          </span>
          <span
            v-if="!!orgSearchInput.length && !performedSearch"
            class="subheading"
            key="3"
          >
            Now press enter or click the <v-icon>search</v-icon> icon!
          </span>
          <span
            v-if="performedSearch"
            class="subheading"
            key="4"
          >
            Good! You can use it again, as many times you want!
            <v-icon>mood</v-icon>
          </span>
        </v-slide-y-transition>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    useSearchTip: true,
    performedSearch: false,
    orgSearchInput: '',
    organizationList: []
  }),

  methods: {
    submit: async function () {
      this.performedSearch = true
      try {
        this.$emit('searchStarted', this.orgSearchInput)
        let response = await this.$axios.get('search/users', {
          params: {
            q: `${this.orgSearchInput} type:org`
          }
        })
        this.$emit('resultsFound', { results: response.data.items, searchInput: this.orgSearchInput })
      } catch (error) {
        this.$emit('searchError', error.response.data.message)
      } finally {
        this.$emit('searchEnded', this.orgSearchInput)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
