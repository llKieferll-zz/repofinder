<template>
  <v-form>
    <v-layout justify-center row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-radio-group
          class="justify-center"
          v-model="propertyToSort"
          @change="$emit('changeSort', propertyToSort)"
        >
          <div slot="label">Sort repositories by</div>
          <v-radio
            color="primary"
            label="Stars"
            value="stars"
          />
          <v-radio
            color="primary"
            label="Forks"
            value="forks"
          />
          <v-radio
            color="primary"
            label="Updated"
            value="updated"
          />
        </v-radio-group>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-radio-group
          class="justify-center"
          v-model="propertyToOrder"
          @change="$emit('changeOrder', propertyToOrder)"
        >
          <div slot="label">Sort repositories by</div>
          <v-radio
            color="primary"
            label="Asc"
            value="asc"
          />
          <v-radio
            color="primary"
            label="Desc"
            value="desc"
          />
        </v-radio-group>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-autocomplete
          outline
          single-line
          hide-details
          v-model="languageToFilter"
          :items="items"
          placeholder="Filter by language"
          @input="$emit('changeLanguage', languageToFilter)"
        />
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    propertyToSort: 'stars',
    propertyToOrder: 'desc',
    languageToFilter: 'language',
    items: []
  }),

  props: {
    organization: {
      type: Object,
      required: true
    },
    repositoryList: {
      type: Array,
      required: true
    }
  },

  async mounted () {
    try {
      this.$root.$addToLoader(`Fetching languages of repositories`)
      this.items = [...new Set(this.repositoryList.reduce((previous, current) => {
        if (current.language !== 'None') previous.push(current.language)
        return previous
      }, []))]
      this.items.unshift('All')
    } catch (error) {
      this.$root.$addToSnackbar(error.response.data.errors[0].message, 'error')
    } finally {
      this.$root.$removeFromLoader(`Fetching languages of repositories`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
