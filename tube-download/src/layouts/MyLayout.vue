<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-10">
    <q-layout-header>
      <q-toolbar
        color="dark"
        :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title class="text-center">
          Youtube Download
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-layout-footer>
      <q-tabs color="dark">
        <q-route-tab
          icon="tab_unselected"
          to="/selected"
          exact
          slot="title"
        />
        <q-route-tab
          icon="explore"
          to="/"
          exact
          slot="title"
        />
        <q-route-tab
          icon="cloud_download"
          to="/download"
          exact
          slot="title"
        />
      </q-tabs>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  created () {
    this.$q.addressbarColor.set('#616161')
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
