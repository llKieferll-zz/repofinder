<template>
  <v-navigation-drawer v-model="drawer" lazy app>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            TEST
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-list dense class="pt-0">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>TEST</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => {
    return {
      drawer: false
    }
  },

  methods: {
    toggle: function () {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style>

</style>
