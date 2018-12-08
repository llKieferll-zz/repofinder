<template>
  <v-snackbar
    auto-height
    left
    bottom
    :timeout="4000"
    :color="snackbarColor"
    v-model="snackbar"
  >
    <span>{{message}}</span>
    <v-btn
      icon
      :color="closeButtonColor"
      @click.native="snackbar = false"
    >
      <v-icon :color="closeButtonIconColor">close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {

  data: () => ({
    snackbar: false,
    message: '',
    snackbarColor: '',
    closeButtonColor: '',
    closeButtonIconColor: '',
    messageQueue: []
  }),

  methods: {
    add: function (
      message = 'No message defined',
      snackbarColor = 'secondary',
      closeButtonColor = 'white',
      closeButtonIconColor = 'black'
    ) {
      this.messageQueue.push({ message, snackbarColor, closeButtonColor, closeButtonIconColor })
      if (!this.snackbar) {
        let { message, snackbarColor, closeButtonColor, closeButtonIconColor } = this.messageQueue.shift()
        this.message = message
        this.snackbarColor = snackbarColor
        this.closeButtonColor = closeButtonColor
        this.closeButtonIconColor = closeButtonIconColor
        this.snackbar = true
      }
    }
  },

  watch: {
    snackbar: {
      handler: function () {
        if (!this.snackbar && this.messageQueue.length > 0) {
          let { message, snackbarColor, closeButtonColor, closeButtonIconColor } = this.messageQueue.shift()
          this.message = message
          this.snackbarColor = snackbarColor
          this.closeButtonColor = closeButtonColor
          this.closeButtonIconColor = closeButtonIconColor
          this.$nextTick(() => { this.snackbar = true })
        }
      }
    }
  },

  mounted () {
    this.$root.$addToSnackbar = this.add
  }

}
</script>

<style lang="scss" scoped>
</style>
