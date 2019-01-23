// import something here
import YoutubeSearch from 'youtube-search-promise'
var opts = {
  maxResults: 10,
  key: 'AIzaSyCO8NIdNM3XHshNW76cQN2sWxiUDND_XrA'
}
// leave the export, even if you don't use it AIzaSyCO8NIdNM3XHshNW76cQN2sWxiUDND_XrA
export default ({ Vue }) => {
  // something to do
  Vue.prototype.$ytsearch = YoutubeSearch
  Vue.prototype.$opts = opts
}
