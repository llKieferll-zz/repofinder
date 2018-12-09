<template>
  <v-slide-y-transition
    class="v-list v-list--two-line"
    group
    tag="div"
  >
    <div v-for="(repository, index) in list" :key="index">
      <RepositoryListItem :repository="repository" />
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
    RepositoryListItem: () => import('@/components/repository/RepositoryListItem')
  }

}
</script>

<style lang="scss" scoped>
</style>
