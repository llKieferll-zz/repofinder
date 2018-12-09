<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-flex xs12 class="text-xs-left hidden-md-and-up">
        <span class="subheading">
          <v-icon x-large style="transform: rotate(90deg);">subdirectory_arrow_left</v-icon>
          I'm telling you, to look for organizations, go here!
        </span>
      </v-flex>
      <v-flex xs12 class="text-xs-right hidden-sm-and-down">
        <span class="subheading pr-4">
          I'm telling you, to look for organizations, go here!
          <v-icon x-large style="transform: rotate(-90deg);">subdirectory_arrow_right</v-icon>
        </span>
      </v-flex>
      <v-flex xs12 class="text-xs-center">
        <blockquote class="blockquote">
          &#8220;What are you doing here? The app needs an organization ID! Follow the tip up there!&#8221;
          <footer>
            <small>
              <em>&mdash; A pissed programmer.</em>
            </small>
          </footer>
        </blockquote>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
