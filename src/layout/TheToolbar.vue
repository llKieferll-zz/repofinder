<template>
  <v-toolbar
    app
    flat
    dark
    color="primary"
  >
    <v-toolbar-side-icon class="hidden-md-and-up" @click="$emit('toggleDrawer')" />
    <v-toolbar-title>Repofinder</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{name: 'Home'}">Home</v-btn>
      <v-btn flat :to="{name: 'Search'}">Search</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
