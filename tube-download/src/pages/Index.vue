<template>
  <q-page class="gutter-sm">
    <modal-player ref="modalplayer"></modal-player>
    <modal-format ref="modalformat"></modal-format>
    <div class="row q-ma-sm text-center items-center">
      <div class="col-8">
          <q-input v-model="searchValue" inverted color="dark"
            placeholder="Pesquise aqui ..."></q-input>
      </div>
      <div class="col-2">
        <q-btn outline round @click="limparCampo()" color="white" icon="clear"></q-btn>
      </div>
      <div class="col-2">
        <q-btn round @click="pesquisarVideo()" color="negative" icon="search"></q-btn>
      </div>
    </div>
    <hr>
    <div v-if="videos.length > 0">
      <div v-for="(video, index) in videos" :key="index">
        <div v-if="verifyVideo(video.link)">
          <q-card inline class="q-ma-sm bg-negative">
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
                      <q-btn flat round icon="cloud_download" @click="$refs.modalformat.open(video)"></q-btn>
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
    </div>
    <div v-else>
      <q-alert color="negative" class="text-center fixed-center" style="width: 100%">
        Não há videos
      </q-alert>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapMutations, mapState } from 'vuex'
import ModalPlayer from '../components/ModalPlayer.vue'
import ModalFormat from '../components/ModalFormat.vue'
export default {
  name: 'PageIndex',
  components: {
    ModalPlayer,
    ModalFormat
  },
  data () {
    return {
      searchValue: '',
      loading: 0,
      toDownload: []
    }
  },
  computed: {
    ...mapState('video', ['videos'])
  },
  methods: {
    ...mapMutations('video', ['VIDEOS_SEARCH']),
    pesquisarVideo () {
      this.$q.loading.show()
      this.$ytsearch(this.searchValue, this.$opts)
        .then((res) => {
          this.VIDEOS_SEARCH(res)
          this.$q.loading.hide()
        })
        .catch((err) => {
          console.error(err)
          this.$q.loading.hide()
        })
    },
    limparCampo () {
      this.searchValue = ''
    },
    adicionarLista (link) {
      let index = this.verificaMarcacaoLista(link)
      if (index === -1) {
        this.toDownload.splice(index, 1)
      } else {
        this.toDownload.push(link)
      }
    },
    verifyVideo (link) {
      return !(link.indexOf('channel') !== -1 || link.indexOf('playlist') !== -1)
    },
    verificaMarcacaoLista (link) {
      return this.toDownload.indexOf(link)
    }
  }
}
</script>
