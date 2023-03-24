import axios from 'axios'

export default function request(config) {
  const instance = axios.create({
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })

  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      console.log('error occur when send request')
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      const data = response.data
      console.log('status code from response line ' + response.status)
      console.log('customized status code from server ' + data.code)
      return response
    },
    (error) => {
      console.log('error occur when receive response')
      return Promise.reject(error)
    }
  )

  return instance(config)
}