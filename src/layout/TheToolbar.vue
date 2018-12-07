<template>
  <v-toolbar app>
    <v-toolbar-side-icon @click="$emit('toggleDrawer')"></v-toolbar-side-icon>
    <v-toolbar-title>TEST</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat>TEST 1</v-btn>
      <v-btn flat>TEST 2</v-btn>
      <v-btn flat>TEST 3</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {

}
</script>

<style>

</style>
