<template>
  <v-layout
    column
    align-center
  >
    <v-container
      fluid
      v-bind="{ [`grid-list-${$vuetify.breakpoint.name}`]: true }"
    >
      <v-slide-y-transition
        group
        appear
        leave-absolute
        mode="in-out"
        class="layout row wrap justify-center"
        tag="div"
      >
        <v-flex
          v-for="(organization, index) in list"
          class="pa-2"
          xs12
          sm6
          md3
          :key="index"
        >
          <OrganizationListItem :item="organization" />
        </v-flex>
      </v-slide-y-transition>
    </v-container>
  </v-layout>
</template>

<script>
export default {

  props: {
    list: {
      type: Array,
      required: true
    }
  },

  components: {
    OrganizationListItem: () => import(/* webpackChunkName: "[request]Component" */ '@/components/organization/OrganizationListItem')
  }
}
</script>

<style lang="scss" scoped>
</style>
