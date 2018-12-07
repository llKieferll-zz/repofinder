<template>
  <v-app>
    <TheDrawer ref="drawer" />
    <TheToolbar @toggleDrawer="$refs.drawer.toggle()" />
    <TheLoader />
    <TheContent />
    <TheFooter />
  </v-app>
</template>

<script>
// These components will always be present, we won't lazy load them.
import TheDrawer from '@/layout/TheDrawer'
import TheLoader from '@/layout/TheLoader'
import TheToolbar from '@/layout/TheToolbar'
import TheContent from '@/layout/TheContent'
import TheFooter from '@/layout/TheFooter'

export default {

  components: {
    'TheDrawer': TheDrawer,
    'TheLoader': TheLoader,
    'TheToolbar': TheToolbar,
    'TheContent': TheContent,
    'TheFooter': TheFooter
  }

}
</script>

<style>

</style>
