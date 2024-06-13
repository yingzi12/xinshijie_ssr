import request from 'boot/axios'

// 查询世界评论列表
export function listDiscuss(query) {
  return request({
    url: '/wiki/discuss/list',
    method: 'get',
    params: query
  })
}

// 查询世界评论详细
export function getDiscuss(id) {
  return request({
    url: '/wiki/discuss/getInfo?did=' + id,
    method: 'get'
  })
}
