import axios from 'axios'
import { Message } from 'element-ui'

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
      const errMsg = response.data && response.data.message ? response.data.message : '系统异常'

      if (response.status != 200) {
        Message.error(errMsg)
        return Promise.reject(errMsg)
      }

      if (response.data.code != 200) {
        Message.error(errMsg)
        return Promise.reject(errMsg)
      }

      return response
    },
    (error) => {
      if (error.response && error.response.data && error.response.data.message) {
        error.message = error.response.data.message
      }
      Message.error(error.message)
      return Promise.reject(error)
    }
  )

  return instance(config)
}