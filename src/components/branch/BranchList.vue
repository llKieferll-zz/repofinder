<template>
  <v-slide-y-transition
    class="v-list v-list--two-line"
    group
    tag="div"
  >
    <div
      v-for="(branch, index) in list"
      :key="index"
    >
      <BranchListItem :branch="branch" />
    </div>
  </v-slide-y-transition>
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
    BranchListItem: () => import('@/components/branch/BranchListItem')
  }

}
</script>

<style lang="scss" scoped>
</style>
