<template>
  <v-card
    height="100%"
    color="#f0f0f0"
    :to="{ name: 'Organization', params: { org: item.login} }"
  >
    <v-img
      contain
      max-height="125"
      :src="item.avatar_url"
    >
      <v-layout
        slot="placeholder"
        fill-height
        align-center
        justify-center
        class="ma-0"
      >
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-layout>
    </v-img>
    <v-card-actions dark class="grey white--text mt-2">
      <v-spacer></v-spacer>
        <span class="subheading">{{item.login}}</span>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
