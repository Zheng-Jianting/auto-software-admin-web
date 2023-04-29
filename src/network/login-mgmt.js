import request from './request'

const baseURL = 'http://localhost:9000/login-mgmt'

// Login Management

export function pageLoginRecord(params) {
  return request({
    url: baseURL + '/api/login-record',
    method: 'get',
    params
  })
}

export function findLoginRecordByName(name, params) {
  return request({
    url: baseURL + '/api/login-record/' + name,
    method: 'get',
    params
  })
}

export function removeLoginRecord(id) {
  return request({
    url: baseURL + '/api/login-record/' + id,
    method: 'delete'
  })
}