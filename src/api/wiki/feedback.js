import request from 'boot/axios'

export function addFeedback(data) {
    return request({
        url: '/wiki/feedback/add',
        method: 'post',
        data: data
    })
}
