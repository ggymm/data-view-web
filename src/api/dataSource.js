import request from '@/api/request'
import baseUrl from '@/api/baseUrl'

export function getDataSourcePage(params) {
  return request({
    url: baseUrl + 'dataSource/',
    method: 'get',
    params: params
  })
}

export function getDataSourceList() {
  return request({
    url: baseUrl + 'dataSource/list',
    method: 'get'
  })
}
