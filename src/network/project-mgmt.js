import request from './request'

const baseURL = 'http://localhost:8003'

// Project Management

export function pageProject(params) {
  return request({
    url: baseURL + '/api/project',
    method: 'get',
    params
  })
}

export function findProjectByName(name, params) {
  return request({
    url: baseURL + '/api/project/' + name,
    method: 'get',
    params
  })
}

export function updateProjectBasicInfo(newProject) {
  return request({
    url: baseURL + '/api/project',
    method: 'put',
    data: newProject
  })
}

export function deleteProject(id) {
  return request({
    url: baseURL + '/api/project/' + id,
    method: 'delete'
  })
}