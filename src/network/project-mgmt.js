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

// Project Record Management

export function pageProjectRecord(id, module, params) {
  return request({
    url: baseURL + '/api/project/' + id + '/record/' + module,
    method: 'get',
    params
  })
}

export function updateProjectRecord(newRecord) {
  return request({
    url: baseURL + '/api/project/record',
    method: 'put',
    data: newRecord
  })
}

export function deleteProjectRecord(projectId, module, recordId) {
  return request({
    url: baseURL + '/api/project/' + projectId + '/record/' + module + '/' + recordId,
    method: 'delete'
  })
}