<template>
  <div>
    <v-btn @click="$root.$addToLoader('Test ' + counter++)">
      ADD
    </v-btn>
    <v-btn @click="$root.$removeFromLoader('Test ' + --counter)">
      REMOVE
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    counter: 0
  })
}
</script>

<style>

</style>
