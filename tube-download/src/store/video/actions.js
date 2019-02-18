import Vue from 'vue'

const downloadFile = ({ commit }, video) => {
  console.log(video)
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios({
      url: `download`,
      data: {
        URL: video.link,
        Format: video.Format
      },
      method: 'POST',
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        let percent = Math.floor(progressEvent.loaded * 100 / progressEvent.total)
        commit('LOADING', {
          id: video.id,
          percent: percent,
          video: video
        })
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

const showFormats = ({ commit }, video) => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(`info?URL=${video}`)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  downloadFile,
  showFormats
}
