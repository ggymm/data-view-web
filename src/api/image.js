import request from '@/api/request'
import baseUrl from '@/api/baseUrl'

export function getImagePage(params) {
  return request({
    url: baseUrl + 'image/',
    method: 'get',
    params: params
  })
}

export function getImageList() {
  return request({
    url: baseUrl + 'image/list',
    method: 'get'
  })
}
