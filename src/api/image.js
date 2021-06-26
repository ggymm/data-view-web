import request from '@/api/request'
import defaultSettings from '@/config'

const baseUrl = defaultSettings.serviceBaseUrl

export function getImageList(params) {
  return request({
    url: baseUrl + 'image/list',
    method: 'get',
    params: params
  })
}

export function saveThumbnail(params) {
  return request({
    url: baseUrl + 'image/thumbnail',
    method: 'post',
    data: params
  })
}
