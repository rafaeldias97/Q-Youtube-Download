<template>
  <q-page padding>
    <div v-for="(video, index) in videoDownload" :key="index">
      <q-card inline class="q-ma-sm bg-negative q-ma-sm">
        <q-card-media>
          <img :src="video.video.thumbnails.high.url">
          <q-card-title slot="overlay">
            {{ video.video.title }}
            <div class="row items-center" v-if="video.percent !== 100">
              <div class="col-10">
                <q-progress
                  :percentage="video.percent"
                  stripe
                  animate
                  :color="video.percent < 30 ? 'negative' : 'positive'"
                  height="15px"
                />
              </div>
              <div :class="video.percent < 30 ? 'col-2 text-right text-negative': 'col-2 text-right text-positive'">
                {{ video.percent }}%
              </div>
            </div>
            <div v-else>
              <div class="q-title text-positive text-right">
                concluido <q-icon name="done_all"></q-icon>
              </div>
            </div>
            <span slot="subtitle">
            </span>
          </q-card-title>
        </q-card-media>
      </q-card>
      <hr>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // name: 'PageName',
  computed: {
    ...mapState('video', ['videoDownload'])
  }
}
</script>

<style>
</style>
