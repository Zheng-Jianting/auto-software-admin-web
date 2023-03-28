import request from './request'

const baseURL = 'http://localhost:8002'

// User Management

export function pageUser(params) {
  return request({
    url: baseURL + '/api/user',
    method: 'get',
    params
  })
}

export function findUserByName(name, params) {
  return request({
    url: baseURL + '/api/user/' + name,
    method: 'get',
    params
  })
}

export function updateUser(user) {
  return request({
    url: baseURL + '/api/user',
    method: 'put',
    data: user
  })
}

export function removeUser(id) {
  return request({
    url: baseURL + '/api/user/' + id,
    method: 'delete'
  })
}

export function listAssignRole(id) {
  return request({
    url: baseURL + '/api/user/assign-role',
    method: 'get',
    params: { id }
  })
}

// User Role Management

export function assignRole(userId, roleIdList) {
  return request({
    url: baseURL + '/api/user-role/assign-role',
    method: 'post',
    data: { userId, roleIdList }
  })
}