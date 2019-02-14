
const LOADING = (state, payload) => {
  var res = -1
  state.videoDownload.filter((element, index) => {
    if (element.id === payload.id) {
      res = index
    }
  })
  if (res === -1) {
    state.videoDownload.push(payload)
  } else {
    state.videoDownload[res].percent = payload.percent
  }
}

const VIDEOS_SEARCH = (state, payload) => {
  state.videos = payload
}

export default {
  LOADING,
  VIDEOS_SEARCH
}
