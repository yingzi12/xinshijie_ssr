import {api,tansParams} from 'boot/axios'

// 查询元素
export  function listElement(query) {
  return   api.get('/wiki/element/list?'+tansParams(query));
}

// 查询元素详细
export async function getElementDetails(wid,eid) {
  return await api.get('/wiki/element/getInfo?wid=' + wid+'&eid='+eid);
}

// 新增元素
export async function diff(data) {
  return await api.post('/wiki/diff/test',JSON.stringify(data));
  // return request({
  //   url: '/wiki/diff/test',
  //   method: 'post',
  //   data: data
  // })
}
