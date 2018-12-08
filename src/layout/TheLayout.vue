<template>
  <v-app>
    <TheDrawer ref="drawer" />
    <TheToolbar @toggleDrawer="$refs.drawer.toggle()" />
    <TheLoader />
    <TheContent />
    <TheSnackbar />
    <TheFooter />
  </v-app>
</template>

<script>
// These components will always be present, we won't lazy load them.
import TheDrawer from '@/layout/TheDrawer'
import TheLoader from '@/layout/TheLoader'
import TheToolbar from '@/layout/TheToolbar'
import TheContent from '@/layout/TheContent'
import TheSnackbar from '@/layout/TheSnackbar'
import TheFooter from '@/layout/TheFooter'

export default {

  components: {
    'TheDrawer': TheDrawer,
    'TheLoader': TheLoader,
    'TheToolbar': TheToolbar,
    'TheContent': TheContent,
    'TheSnackbar': TheSnackbar,
    'TheFooter': TheFooter
  }

}
</script>

<style lang="scss" scoped>
</style>
