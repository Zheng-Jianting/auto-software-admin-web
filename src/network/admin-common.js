import request from './request'

const baseURL = 'http://localhost:8005'

// Login Interface

export function login(params) {
  return request({
    url: baseURL + '/login',
    method: 'post',
    params
  })
}

export function logout() {
  return request({
    url: baseURL + '/logout',
    method: 'get'
  })
}