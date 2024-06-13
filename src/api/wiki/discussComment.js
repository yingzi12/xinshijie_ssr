import request, { api } from 'boot/axios';

// 查询元素
export function listDiscussComment(query) {
  return api.get('/wiki/discussComment/list')
}

// 查询元素详细
export function getDiscussComment(dcid) {
  return request({
    url: '/wiki/discussComment/getInfo?dcid='+dcid,
    method: 'get'
  })
}
