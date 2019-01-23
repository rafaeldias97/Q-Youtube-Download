<template>
  <q-modal v-model="show" maximized>
    <q-modal-layout class="bg-grey-10">
      <q-toolbar slot="header" color="dark">
        <q-toolbar-title>
          <div class="row items-center">
            <div class="col">
              <b>VIDEO</b>
            </div>
            <div class="col text-right">
              <q-btn flat round icon="close" @click="show = false"></q-btn>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <div class="row">
        <div class="col-12">
          <q-video
              v-if="show"
              :src="url"
              style="width: 100%"
            />
        </div>
      </div>
      <div class="row q-ma-sm">
        <div class="col">
          <q-alert color="dark"><b class="text-white">{{ video.title }}</b></q-alert>
        </div>
      </div>
      <div class="row q-ma-sm">
        <div class="col">
          <q-alert color="dark"><b class="text-white">{{ video.description }}</b></q-alert>
        </div>
      </div>
      <div class="row q-ma-sm">
        <div class="col">
          <q-alert color="dark"><b class="text-white">{{ video.publishedAt }}</b></q-alert>
        </div>
      </div>
      <div class="row q-ma-sm">
        <div class="col">
          <q-alert color="dark"><b class="text-white">{{ video.link }}</b></q-alert>
        </div>
      </div>
      <div class="row q-ma-sm">
        <div class="col-12 text-right">
          <b class="text-white">
            <q-btn color="purple" icon-right="cloud_download" label="Download"></q-btn>
          </b>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
export default {
  name: 'modalplayer',
  data () {
    return {
      url: '',
      show: false,
      video: ''
    }
  },
  methods: {
    formatLinkVideo (link) {
      link = link.replace('watch?v=', 'embed/')
      return link
    },
    play (video) {
      this.url = this.formatLinkVideo(video.link)
      this.video = video
      this.show = true
    }
  }
}
</script>
