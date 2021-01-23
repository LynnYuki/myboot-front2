import request from '@/utils/request'
import api from '../interfaceurls'

export function helloWorld (parameter) {
    return request({
        url:api.test1,
        method:'get',
        params:parameter
    })
}

export function helloWorld2 (parameter) {
    return request({
        url:api.test2,
        method:'post',
        data:parameter
    })
}