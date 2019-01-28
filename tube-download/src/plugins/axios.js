import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    // baseURL: 'http://192.168.1.3:4000/'
    baseURL: 'https://young-sands-65678.herokuapp.com/'
  })
}
