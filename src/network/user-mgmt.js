import request from './request'

const baseURL = 'http://localhost:9000/user-mgmt'

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

// Role Management

export function pageRole(params) {
  return request({
    url: baseURL + '/api/role',
    method: 'get',
    params
  })
}

export function getEditRoleDialogInfo(id) {
  return request({
    url: baseURL + '/api/role/' + id,
    method: 'get'
  })
}

export function editRoleAndPermission(params) {
  return request({
    url: baseURL + '/api/role',
    method: 'post',
    data: params
  })
}

export function removeRole(id) {
  return request({
    url: baseURL + '/api/role/' + id,
    method: 'delete'
  })
}