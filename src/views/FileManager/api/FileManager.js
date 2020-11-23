import request from '@/utils/request';

export function showCapacity(data) {
    return request({
        url: _baseUrl + '/api/file/showCapacity',
        method: 'post',
        data,
    })
}

export function showAllFile(data) {
    return request({
        url: _baseUrl + '/api/file/showAllFile',
        method: 'post',
        data,
    })
}

export function showFileInfo(data) {
    return request({
        url: _baseUrl + '/api/file/showFileInfo',
        method: 'post',
        data,
    })
}