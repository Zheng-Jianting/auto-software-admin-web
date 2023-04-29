import request from './request'

const baseURL = 'http://localhost:9000/statistics-mgmt'

// Statistics Management

export function statistics() {
  return request({
    url: baseURL + '/statistics',
    method: 'get'
  })
}