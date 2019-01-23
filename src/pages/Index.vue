<template>
  <q-page class="gutter-sm">
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
    <div v-for="(video, index) in videos" :key="index">
      <q-card inline class="q-ma-sm">
        <q-card-media>
          <img :src="video.thumbnails.high.url">

          <q-card-title slot="overlay">
            {{ video.title }}
            <span slot="subtitle">
              <div class="row text-center">
                <div class="col">
                  <q-btn flat round icon="play_arrow"></q-btn>
                </div>
                <div class="col">
                  <q-btn flat round icon="cloud_download"></q-btn>
                </div>
                <div class="col">
                  <q-btn flat round icon="tab_unselected"></q-btn>
                </div>
              </div>
            </span>
          </q-card-title>
        </q-card-media>
      </q-card>
      <hr>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      searchValue: '',
      videos: []
    }
  },
  methods: {
    pesquisarVideo () {
      this.$ytsearch(this.searchValue, this.$opts)
        .then((res) => {
          this.videos = res
        })
        .catch((err) => {
          console.error(err)
        })
    },
    limparCampo () {
      this.searchValue = ''
      this.videos = []
    }
  }
}
</script>
