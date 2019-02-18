<template>
  <q-modal v-model="show" position="bottom" :content-css="{ maxHeight: '60vh' }">
    <q-modal-layout class="white">
      <q-toolbar slot="header" color="white" class="text-dark">
        <q-toolbar-title>
          <div class="row items-center">
            <div class="col">
              <span style="display: inline-block; width: 40vh; white-space: nowrap; overflow: hidden !important;text-overflow: ellipsis;">
                <b>{{ title }}</b>
              </span>
            </div>
            <div class="col text-right">
              <q-btn flat round icon="expand_more" @click="show = false"></q-btn>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <div class="text-dark q-pa-md">
        <div class="row">
          <div class="col">
            <b class="q-sublabel">Baixar Como:</b>
          </div>
        </div>
        <span class="q-ml-lg"><q-icon color="warning" name="music_note"/> Música</span><br>
        <div class="row gutter-xs q-pt-sm">
          <div class="col-4" v-for="(audio, index) in audios" :key="index">
            <q-btn dense outline size="sm" icon-right="cloud_download" color="negative" class="full-width"
              @click="download(audio)">
              {{ formatType(audio.type) || '???' }}<br/>
              {{ audio.audioBitrate }} K<br/>
              {{ audio.audio_sample_rate / 10000 }} MB
            </q-btn>
          </div>
        </div>
        <hr>
        <span class="q-ml-lg"><q-icon color="warning" name="play_arrow"/> Vídeo</span><br>
        <div class="row gutter-xs q-pt-sm">
          <div class="col-4 text-center" v-for="(video, index) in videos" :key="index">
            <div v-if="video.size">
              <q-btn dense outline class="full-width" size="sm" icon-right="cloud_download" color="negative"
                @click="download(video)">
                {{ formatType(video.type) || '???' }}<br/>
                {{ video.size }}
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'modalformat',
  data () {
    return {
      url: '',
      show: false,
      title: '',
      videos: [],
      audios: []
    }
  },
  methods: {
    ...mapActions('video', ['showFormats', 'downloadFile']),
    formatLinkVideo (link) {
      link = link.replace('watch?v=', 'embed/')
      return link
    },
    formatType (type) {
      console.log(type.split(';')[0].replace('audio', 'audio/mp3'))
      return type.split(';')[0].replace('audio/webm', 'audio/mp3')
    },
    isVideo (format) {
      return format.indexOf('video') > -1
    },
    open (video) {
      this.url = video.link
      this.title = video.title
      this.videos = []
      this.audios = []
      this.showFormats(this.url)
        .then((res) => {
          res.data.forEach(element => {
            if (this.isVideo(element.type)) {
              if (element.type.indexOf('webm') === -1) {
                this.videos.push(element)
              }
            } else {
              this.audios.push(element)
            }
          })
          this.show = true
        })
    },
    download (video) {
      console.log(this.isVideo(video.type))
      let fileFormat = {
        link: this.url,
        Format: video
      }
      this.downloadFile(fileFormat)
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.href = url
          if (this.isVideo(video.type)) {
            link.setAttribute('download', `${this.title}.mp4`)
          } else {
            link.setAttribute('download', `${this.title}.mp3`)
          }
          document.body.appendChild(link)
          link.click()
        })
        .catch((err) => {
          this.$q.notify({
            message: 'ocorreu um erro',
            position: 'top',
            color: 'negative',
            icon: 'warning'
          })
          console.log('ocorreu um erro', err)
        })
    }
  }
}
</script>
