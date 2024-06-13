import request from 'boot/axios'

// 查询世界列表
export function listMangeWorld(query) {
  return request({
    url: '/admin/world/list',
    method: 'get',
    params: query
  })
}

// 查询世界详细
export function getWorld(id) {
  return request({
    url: '/admin/world/getInfo/' + id,
    method: 'get'
  })
}

export function getWorldByName(name) {
  return request({
    url: '/admin/world/getInfoByName/' + name,
    method: 'get'
  })
}
// 新增世界
export function addWorld(data) {
  return request({
    url: '/admin/world/add',
    method: 'post',
    data: data
  })
}

// 修改世界
export function updateWorld(data) {
  return request({
    url: '/admin/world/edit',
    method: 'put',
    data: data
  })
}

// 删除世界
export function delWorld(id) {
  return request({
    url: '/admin/world/remove/' + id,
    method: 'delete'
  })
}
//上传文件
export function updateImageUrl(data) {
  return request({
    url: '/admin/world/imageUrl',
    method: 'post',
    data: data
  })
}
// // 查询世界详细
export function issue(wid) {
  return request({
    url: '/admin/world/issue?wid=' + wid,
    method: 'get'
  })
}
