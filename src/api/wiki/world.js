import request from 'boot/axios'

// 查询世界列表
export function listWorld(query) {
  return request({
    url: '/wiki/world/list',
    method: 'get',
    params: query
  })
}

// 查询世界详细
export function getWorld(id) {
  return request({
    url: '/wiki/world/getInfo/' + id,
    method: 'get'
  })
}
export function getWorldByName(name) {
  return request({
    url: '/wiki/world/getInfoByName/' + name,
    method: 'get'
  })
}


