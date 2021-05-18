import request from '@/api/request'
import baseUrl from '@/api/baseUrl'

export function getDataViewPage(params) {
  return request({
    url: baseUrl + 'dataView/',
    method: 'get',
    params: params
  })
}

export function getDataView(params) {
  return request({
    url: baseUrl + 'dataView/' + params,
    method: 'get'
  })
}

export function getChartData(params) {
  return request({
    url: baseUrl + 'dataView/chartData',
    method: 'get',
    params
  })
}
