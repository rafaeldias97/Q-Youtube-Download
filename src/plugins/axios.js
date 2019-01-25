import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: 'http://192.168.1.4:4000/'
  })
}
