<template>
  <!-- Whenever the organization in the route changes, the whole view will be remounted.
  This is useful to trigger the mounted lifecycle again and set the necessary data accordinly -->
  <router-view :key="$route.params.org"/>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
