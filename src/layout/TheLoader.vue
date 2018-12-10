<template>
  <v-dialog
    lazy
    persistent
    v-model="loading"
    width="350"
  >
    <v-card
      dark
      color="primary"
    >
      <v-card-title class="headline justify-center">
        Loading stuff...
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        />
      </v-card-title>
      <v-card-text>
        <v-list
          class="primary"
          dense
        >
          <template v-for="(message, index) in messageQueue">
            <v-list-tile
              three-line
              dense
              :key="`${index}-tile`"
              class="py-2"
            >
              <v-list-tile-action>
                <v-icon>fiber_manual_record</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                {{message}}
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset color="white" :key="`${index}-divider`"/>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {

  data: () => ({
    messageQueue: [],
    loading: false
  }),

  methods: {
    add: function (message) {
      this.messageQueue.push(message)
      this.loading = true
    },
    remove: function (message) {
      this.messageQueue.splice(this.messageQueue.findIndex(m => m.toLowerCase() === message.toLowerCase()), 1)
      this.loading = !!this.messageQueue.length
    }
  },

  mounted () {
    // Referencing the add and remove functions so they can be used globally
    this.$root.$addToLoader = this.add
    this.$root.$removeFromLoader = this.remove
  }

}
</script>

<style lang="scss" scoped>
</style>
