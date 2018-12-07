<template>
  <v-dialog
    lazy
    persistent
    v-model="loading"
    width="300"
  >
    <v-card
      dark
      color="primary"
    >
      <v-card-title class="title">
        Loading your stuff...
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
          <v-list-tile
            v-for="(message, index) in messageQueue"
            :key="`${index}-message`"
          >
            {{message}}
          </v-list-tile>
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
    this.$root.$addToLoader = this.add
    this.$root.$removeFromLoader = this.remove
  }

}
</script>

<style lang="scss" scoped>
</style>
