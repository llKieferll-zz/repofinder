<template>
  <v-hover>
    <v-list-tile
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 6 : 0} branch-list-item`"
    >
      <v-list-tile-content>
        <v-list-tile-title class="title">{{branch.name}}</v-list-tile-title>
        <v-list-tile-sub-title v-if="$vuetify.breakpoint.smAndUp">
          <span class="caption">{{branch.commit.message ? branch.commit.message : ' No message (are you logged in?) ' }}</span>
        </v-list-tile-sub-title>
        <v-list-tile-sub-title>
          <v-chip
            disabled
            color="info"
            style="height: 12px; width: 12px;"
            text-color="#333"
          >
          </v-chip>
          <span class="caption">{{branch.commit.author ? branch.commit.author : ' No author (are you logged in?) ' }}</span>
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-hover>
</template>

<script>
export default {

  props: {
    branch: {
      type: Object,
      required: true
    }
  }

}
</script>

<style lang="scss" scoped>
  .branch-list-item {
    border: 1px solid #eee;
  }
  .branch-list-item:hover {
    cursor: pointer
  }
</style>
