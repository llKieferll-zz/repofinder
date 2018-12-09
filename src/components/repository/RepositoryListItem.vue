<template>
  <v-hover>
    <v-list-tile
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 6 : 0} repository-list-item`"
    >
      <v-list-tile-content>
        <v-list-tile-title class="title">{{repository.name}}</v-list-tile-title>
        <v-list-tile-sub-title v-if="$vuetify.breakpoint.smAndUp">
          <span class="caption">{{repository.description}}</span>
        </v-list-tile-sub-title>
        <v-list-tile-sub-title>
          <v-chip
            disabled
            color="info"
            style="height: 12px; width: 12px;"
            text-color="#333"
          >
          </v-chip>
          <span class="caption">{{repository.language}}</span>
        </v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-layout column align-end>
          <v-tooltip left>
            <span slot="activator" class="caption justify-end">{{repository.forks}} <v-icon small color="success">call_split</v-icon></span>
            <span>Forks</span>
          </v-tooltip>
          <v-tooltip left>
            <span slot="activator" class="caption justify-end">{{repository.stars}} <v-icon small color="warning">star</v-icon></span>
            <span>Stars</span>
          </v-tooltip>
        </v-layout>
      </v-list-tile-action>
    </v-list-tile>
  </v-hover>
</template>

<script>
export default {

  props: {
    repository: {
      type: Object,
      required: true
    }
  }

}
</script>

<style lang="scss" scoped>
  .repository-list-item {
    border: 1px solid #eee;
  }
  .repository-list-item:hover {
    cursor: pointer
  }
</style>
