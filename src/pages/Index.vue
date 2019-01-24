<template>
  <q-page class="gutter-sm">
    <modal-player ref="modalplayer"></modal-player>
    <div class="row gutter-sm text-center items-center">
      <div class="col-1">
          <q-icon name="play_circle_outline" size="2rem" color="white"></q-icon>
      </div>
      <div class="col-11">
          <q-input v-model="searchValue" inverted color="dark" class="q-ma-sm"
            placeholder="Pesquise aqui ..."></q-input>
      </div>
      <div class="col text-left q-ml-sm">
        <q-btn @click="limparCampo()" color="purple" label="limpar" icon="clear"></q-btn>
      </div>
      <div class="col text-right q-mr-sm">
        <q-btn @click="pesquisarVideo()" color="purple" label="pesquisar" icon-right="search"></q-btn>
      </div>
    </div>
    <br>
    <hr>
    <div v-if="videos.length > 0">
      <div v-for="(video, index) in videos" :key="index">
        <q-card inline class="q-ma-sm bg-negative q-ma-sm">
          <q-card-media>
            <img :src="video.thumbnails.high.url">
            <q-card-title slot="overlay">
              {{ video.title }}
              <span slot="subtitle">
                <div class="row text-center">
                  <div class="col">
                    <q-btn flat round icon="play_arrow" @click="$refs.modalplayer.play(video)"></q-btn>
                  </div>
                  <div class="col">
                    <q-btn flat round icon="cloud_download" @click="download(video.link)"></q-btn>
                  </div>
                  <div class="col">
                    <q-btn flat round icon="tab_unselected" @click="adicionarLista(video.link)"></q-btn>
                  </div>
                </div>
              </span>
            </q-card-title>
          </q-card-media>
        </q-card>
        <hr>
      </div>
    </div>
    <div v-else>
      <q-alert color="dark" class="text-center q-pt-xl">
        Não há videos
      </q-alert>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import ModalPlayer from '../components/ModalPlayer.vue'
export default {
  name: 'PageIndex',
  components: {
    ModalPlayer
  },
  data () {
    return {
      searchValue: '',
      videos: [],
      toDownload: []
    }
  },
  methods: {
    pesquisarVideo () {
      this.$q.loading.show()
      this.$ytsearch(this.searchValue, this.$opts)
        .then((res) => {
          this.videos = res
          this.$q.loading.hide()
        })
        .catch((err) => {
          console.error(err)
          this.$q.loading.hide()
        })
    },
    limparCampo () {
      this.searchValue = ''
      this.videos = []
    },
    adicionarLista (link) {
      let index = this.verificaMarcacaoLista(link)
      if (index === -1) {
        this.toDownload.splice(index, 1)
      } else {
        this.toDownload.push(link)
      }
    },
    verificaMarcacaoLista (link) {
      return this.toDownload.indexOf(link)
    },
    download (URL) {
      this.$q.loading.show()
      this.$axios({
        url: `downloadmp4?URL=${URL}`,
        method: 'GET',
        responseType: 'blob'
      })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'file.mp4')
          document.body.appendChild(link)
          link.click()
          this.$q.loading.hide()
        })
        .catch((err) => {
          this.$q.loading.hide()
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
