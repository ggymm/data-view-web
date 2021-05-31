import request from '@/api/request'
import baseUrl from '@/api/baseUrl'

export function getImageList() {
  return request({
    url: baseUrl + 'image/list',
    method: 'get'
  })
}

export function saveThumbnail(params) {
  return request({
    url: baseUrl + 'image/thumbnail',
    method: 'post',
    data: params
  })
}
