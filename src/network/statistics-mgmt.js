import request from './request'

const baseURL = 'http://localhost:8004'

// Statistics Management

export function statistics() {
  return request({
    url: baseURL + '/statistics',
    method: 'get'
  })
}