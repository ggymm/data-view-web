import request from '@/api/request'
import baseUrl from '@/api/baseUrl'

export function getDataViewPage(params) {
  return request({
    url: baseUrl + 'dataView/',
    method: 'get',
    params: params
  })
}

export function getImageBgList() {
  return request({
    url: baseUrl + 'dataView/imageList',
    method: 'get'
  })
}

export function getChartData() {

}
