import axios from 'axios'

const service = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: '',
  timeout: 300000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
