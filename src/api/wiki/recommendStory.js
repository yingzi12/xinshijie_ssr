import request from 'boot/axios'

export function getRecommendStory(recType) {
    return request({
        url: '/wiki/recommendStory/list?recType=' + recType,
        method: 'get'
    })
}
