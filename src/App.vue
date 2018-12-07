<template>
  <TheLayout />
</template>

<script>
// These components will always be present, we won't lazy load them
import TheLayout from '@/layout/TheLayout'

export default {
  components: {
    'TheLayout': TheLayout
  }
}
</script>

<style lang="scss" scoped>
</style>
