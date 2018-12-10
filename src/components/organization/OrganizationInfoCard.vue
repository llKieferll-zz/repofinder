<template>
  <v-card
    flat
    color="transparent"
  >
    <v-card-text>
      <v-layout
        justify-center
        :align-center="$vuetify.breakpoint.smAndDown"
        row
        wrap
      >
        <router-link :to="{ name: 'Repositories', params: { org: organization.login} }">
          <v-img
            :src="organization.avatar_url"
            :max-height="$vuetify.breakpoint.smAndDown ? '75px' : '150px'"
            :height="$vuetify.breakpoint.smAndDown ? '75px' : '150px'"
            :max-width="$vuetify.breakpoint.smAndDown ? '75px' : '150px'"
            :width="$vuetify.breakpoint.smAndDown ? '75px' : '150px'"
            contain
          />
        </router-link>
        <v-flex>
          <v-layout column class="pl-3">
            <span :class="$vuetify.breakpoint.smAndDown ? 'headline' : 'display-1'">
              {{organization.name ? organization.name : organization.login}}
            </span>
            <span :class="$vuetify.breakpoint.smAndDown ? 'caption' : 'subheading'">
              <v-icon small>location_on</v-icon> {{organization.location ? organization.location : 'Not specified'}}
            </span>
            <span :class="$vuetify.breakpoint.smAndDown ? 'caption' : 'subheading'">
              <v-icon small>email</v-icon> {{organization.email ? organization.email : 'Not specified'}}
            </span>
            <span
              v-if="organization.blog"
              :class="$vuetify.breakpoint.smAndDown ? 'caption' : 'subheading'"
            >
              <v-icon small>web</v-icon>&nbsp;<a :href="organization.blog">{{organization.blog}}</a>
            </span>
            <span
              v-else
              :class="$vuetify.breakpoint.smAndDown ? 'caption' : 'subheading'"
            >
              <v-icon small>web</v-icon>&nbsp;Not specified
            </span>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {

  props: {
    organization: {
      type: Object,
      required: true
    }
  }

}
</script>

<style>

</style>
