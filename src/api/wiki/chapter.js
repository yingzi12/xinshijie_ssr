import api, { tansParams } from 'boot/axios';

export function listChapter(queryParams) {
  return api.get('/wiki/chapter/list?'+ tansParams(queryParams));
}

// 查询元素
// export function listChapterAll(query) {
//   return request({
//     url: '/wiki/chapter/listAll',
//     method: 'get',
//     params: query
//   })
// }
//
// // 查询元素详细
// export function getChapter(sid,scid) {
//   return request({
//     url: '/wiki/chapter/getInfo?sid=' + sid+'&scid='+scid,
//     method: 'get'
//   })
// }
