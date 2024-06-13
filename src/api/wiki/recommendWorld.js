import request from 'boot/axios'

export function getRecommendWorld(recType) {
    return request({
        url: '/wiki/recommendWorld/list?recType=' + recType,
        method: 'get'
    })
}
