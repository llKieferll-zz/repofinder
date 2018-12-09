<template>
  <v-form>
    <v-layout justify-center>
      <v-flex class="text-xs-center">
        <v-radio-group
          v-model="propertyToSort"
          :row="$vuetify.breakpoint.mdAndUp"
          @change="$emit('change', propertyToSort)"
        >
          <div slot="label">Sort organizations by</div>
          <v-radio
            color="primary"
            label="Relevance"
            value="score"
          />
          <v-radio
            color="primary"
            label="Name"
            value="login"
          />
        </v-radio-group>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    propertyToSort: 'score'
  })
}
</script>

<style lang="scss" scoped>
</style>
