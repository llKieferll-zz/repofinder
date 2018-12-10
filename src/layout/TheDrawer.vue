<template>
  <v-navigation-drawer
    app
    lazy
    disable-resize-watcher
    v-model="drawer"
  >
    <v-toolbar
      flat
      dark
      color="primary"
    >
      <v-toolbar-title>Menu</v-toolbar-title>
    </v-toolbar>
    <v-divider />
    <v-list
      dense
      class="pt-0"
    >
      <v-list-tile :to="{ name: 'Home' }">
        <v-list-tile-action>
          <v-icon color="primary">home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="{ name: 'Search' }">
        <v-list-tile-action>
          <v-icon color="primary">search</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Search</v-list-tile-title>
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
