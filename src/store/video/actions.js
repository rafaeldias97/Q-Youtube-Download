import Vue from 'vue'

const downloadAudio = ({ commit }, video) => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios({
      url: `download-audio?URL=${video.link}`,
      method: 'GET',
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        let percent = Math.floor(progressEvent.loaded * 100 / progressEvent.total)
        commit('LOADING', {
          id: video.id,
          percent: percent,
          video: video
        })
        console.log('action', percent)
      }
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        console.log('ocorreu um erro', err)
        reject(err)
      })
  })
}

export default {
  downloadAudio
}
