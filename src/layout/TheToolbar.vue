<template>
  <v-toolbar
    app
    flat
    dark
    color="primary"
  >
    <v-toolbar-side-icon @click="$emit('toggleDrawer')" />
    <v-toolbar-title>Gitfinder</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>Link 1</v-btn>
      <v-btn flat>Link 2</v-btn>
      <v-btn flat>Link 3</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
