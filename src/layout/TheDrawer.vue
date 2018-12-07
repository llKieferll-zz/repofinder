<template>
  <v-navigation-drawer
    app
    lazy
    v-model="drawer"
  >
    <v-toolbar
      flat
      dark
      color="primary"
    >
      <v-list>
        <v-list-tile @click="this.console.log('haha')">
          <v-list-tile-title class="title">
            Menu
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider />

    <v-list
      dense
      class="pt-0"
    >
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="primary">person</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Menu item</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {

  data: () => ({
    drawer: false
  }),

  methods: {
    toggle: function () {
      this.drawer = !this.drawer
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
