<template>
  <v-form @submit.prevent="searchedOnce = true; $emit('search', orgSearchInput)">
    <v-layout justify-center>
      <v-flex
        xs12
        sm10
        md8
        lg6
        xl4
        class="text-xs-center"
      >
        <v-text-field
          outline
          single-line
          v-model="orgSearchInput"
          label="Search for organizations"
          append-icon="search"
          @click:append="searchedOnce = true; $emit('search', orgSearchInput)"
          @focus="inputFocused = false"
          @blur="inputFocused = true"
        />
        <v-slide-y-transition leave-absolute v-if="$vuetify.breakpoint.mdAndUp">
          <span
            v-if="inputFocused && !orgSearchInput.length && !searchedOnce"
            class="subheading"
            key="1"
          >
            <v-icon style="transform: rotate(90deg);">subdirectory_arrow_left</v-icon>
            Use this to search organizations!
            <v-icon style="transform: rotate(-90deg);">subdirectory_arrow_right</v-icon>
          </span>
          <span
            v-if="!inputFocused && !orgSearchInput.length && !searchedOnce"
            class="subheading"
            key="2"
          >
            <v-icon>keyboard</v-icon>
            Type the name of an organization!
          </span>
          <span
            v-if="!!orgSearchInput.length && !searchedOnce"
            class="subheading"
            key="3"
          >
            Now press enter or click the <v-icon>search</v-icon> icon!
          </span>
          <span
            v-if="searchedOnce"
            class="subheading"
            key="4"
          >
            Good! You can search again if you want!
            <v-icon>mood</v-icon>
          </span>
        </v-slide-y-transition>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    inputFocused: true,
    searchedOnce: false,
    orgSearchInput: ''
  })
}
</script>

<style lang="scss" scoped>
</style>
