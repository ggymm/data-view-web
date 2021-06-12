import request from '@/api/request'
import defaultSettings from '@/config'

const baseUrl = defaultSettings.serviceBaseUrl

export function getDataSourcePage(params) {
  return request({
    url: baseUrl + 'data-source/',
    method: 'get',
    params: params
  })
}

export function getDataSourceList() {
  return request({
    url: baseUrl + 'data-source/list',
    method: 'get'
  })
}
