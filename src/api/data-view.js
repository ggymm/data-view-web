import request from '@/api/request'
import defaultSettings from '@/config'

const baseUrl = defaultSettings.serviceBaseUrl

export function getDataViewPage(params) {
  return request({
    url: baseUrl + 'data-view/',
    method: 'get',
    params: params
  })
}

export function getDataView(params) {
  return request({
    url: baseUrl + 'data-view/' + params,
    method: 'get'
  })
}

export function saveDataView(params) {
  return request({
    url: baseUrl + 'data-view/',
    method: 'post',
    data: params
  })
}

export function updateDataView(params) {
  return request({
    url: baseUrl + 'data-view/',
    method: 'put',
    data: params
  })
}

export function getChartData(params) {
  return request({
    url: baseUrl + 'data-view/chart-data',
    method: 'get',
    params
  })
}
