import request from '@/utils/request';

export function showCapacity(data) {
    return request({
        url:"http://"+ _baseUrl + ':' + _basePort + '/api/file/showCapacity',
        method: 'post',
        data,
    })
}

export function showAllFile(data) {
    return request({
        url: "http://"+_baseUrl + ':' + _basePort + '/api/file/showAllFile',
        method: 'post',
        data,
    })
}

export function showFileInfo(data) {
    return request({
        url:"http://"+ _baseUrl + ':' + _basePort + '/api/file/showFileInfo',
        method: 'post',
        data,
    })
}