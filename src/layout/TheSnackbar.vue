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
      // Adds a message to the queue and if there were no messages before adding this one,
      // set the parameters accordingly so it will be shown right away
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
          // nextTick triggers when the DOM finishes updating.
          // This code will trigger when a snackbar started to move away to disappear.
          // In this case, we set the data for the next snackbar in the queue and nextTick will trigger
          // when the snackbar finished disappearing When this happens, we show the
          // next one
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
