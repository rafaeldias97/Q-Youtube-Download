import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    // baseURL: 'https://apitubedown.herokuapp.com//'
    baseURL: 'http://localhost:4000/'
  })
}
