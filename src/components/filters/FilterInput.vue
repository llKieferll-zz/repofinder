<template>
  <v-form>
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
          v-model="input"
          label="Filter"
          append-icon="filter_list"
          @focus="inputFocused = true"
          @blur="inputFocused = false"
          @input="inputDirty = true; $emit('input', input)"
        />
        <v-slide-y-transition leave-absolute>
          <span
            v-if="!inputFocused && !inputDirty"
            class="subheading"
            key="1"
          >
            <v-icon style="transform: rotate(90deg);">subdirectory_arrow_left</v-icon>
            Use this to filter the results
            <v-icon style="transform: rotate(-90deg);">subdirectory_arrow_right</v-icon>
          </span>
          <span
            v-if="inputFocused && !inputDirty"
            class="subheading"
            key="2"
          >
            <v-icon>keyboard</v-icon>
            Type a name you're looking for!
          </span>
          <span
            v-if="inputDirty"
            class="subheading"
            key="4"
          >
            Great! Use it filter as much as you need!
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
    input: '',
    inputFocused: false,
    inputDirty: false
  })

}
</script>

<style lang="scss" scoped>
</style>
