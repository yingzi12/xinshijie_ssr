import request, { api, tansParams } from 'boot/axios';

// 查询元素分类列表
export function listCategory(query) {
  return   api.get('/wiki/category/list?'+tansParams(query));
}


export function getTree(wid) {
  return   api.get( '/wiki/category/getTree?wid=' + wid);

}
