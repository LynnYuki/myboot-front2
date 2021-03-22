import axios from 'axios'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import router from '../router'

const errorLog = (error) =>{
    if(process.env.NODE_ENV === 'development'){
        console.warn('>>>>>>>Error>>>>>>')
        console.error(error)
    }
    notification.error({
        message:'error',
        description:'错误'
    })
}

const errorHandle = (status,otherError,errorUrl) =>{
    console.log(status)
    switch(status){
        case 400:
            errorLog('400-请求错误'+otherError)
            break
        case 401:
            errorLog('登录超时，请重新登录')
            storage.remove(token)
            router.push('/login')
            break
        case 403:
            router.push('/403')
            errorLog('无权访问')
            break
        case 404:
            router.push('/404')
            errorLog(`请求地址出错->${errorUrl}`)
            break
        case 405:
            errorLog(`方法不允许->${errorUrl}`)
            break
        case 500:
            router.push('/500')
            errorLog('服务器内部错误')
            break
        case 501:
            router.push('/500')
            errorLog('服务未实现')
            break
        case 502:
            router.push('/500')
            errorLog('网关错误')
        case 503:
            router.push('/500')
            errorLog('服务不可用')
            break
        case 504:
            router.push('/500')
            errorLog('网关超时')
            break
        case 505:
            router.push('/500')
            errorLog('HTTP版本不受支持')
            break
        default:
            errorLog(otherError)
        } 
}

//超时重新请求
const timeoutHandle = (service,err)=>{
    const {config} = err
    if(!config || !config.retry)
        return Promise.reject(err)
    config.retryCount = config.retryCount || 0
    if(config.retryCount >= config.retry){
        router.push('/408')
        errorLog('请求超时')
        return Promise.reject(err)
    }
    config.retryCount += 1
    const backoff = new Promise((resolve) => {
        setTimeout(()=>{
            resolve()
        },config.retryDelay || 1)
    })
    return backoff.then(() => service(config))
}

//请求队列
const pending = [] //声明一个数组用于存储每个请求的取消函数和标识（cancelKey）
const removePending = (cancleKey) =>{
    for(let p = 0; p < pending.length; p+=1){
        //当前请求在请求队列中存在是执行 取消机制
        if(pending[p].cancleKey === cancleKey) {
            pending[p].cancle({result:`cancel request ${cancleKey}`})
            pending.splice(p,1)
        }
    }
}

//创建axios实例
const service  = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    timeout:50000,
    validateStatus(status){
        return status === 200
    }
})

service.defaults.retry = 2 //请求次数
service.defaults.retryDelay = 1000 //请求间隙

//请求拦截
service.interceptors.request.use(
    (request) => {
        request.headers['Authorization'] = 'Bearer '
        storage.get(process.env.VUE_APP_TOKEN_KEY)
        const {url,method} = request
        const cancleKey = `${url}&${method}`
        removePending(cancleKey)
        request.cancelToken = new axios.CancelToken((c) => {
            pending.push({cancleKey,cancel: c})
        })
        return request
    },
    (error) => {
        errorLog(`请求异常-${error}`)
        return Promise.reject(error)
    }
)

//响应拦截

service.interceptors.response.use(
    (response) => {
        const {url,method} = response.config
        const cancleKey = `${url} & ${method}`
        removePending(cancleKey)
        
        const res = response.data

        if(res && res.code) {
            if(response.status === 200 && res.code === 200) {
                return res
            }else {
                errorHandle(res.code,res.message || res.error)
            }
        }else if (response.status === 200) {
            return {data:res,success:true}
        }else{
            errorHandle(res.status,res.message)
        }
        return Promise.reject(new Error(res.message || 'Error'))
    },
    (error) =>{
        if(axios.isCancel(error)) {
            return Promise.resolve(error.message.result)
        }
        //超时处理
        if(error.code === 'ECONNABORTED' && error.message.idnexOf('timeout') !== -1) {
            return timeoutHandle(service,error)
        }

        //响应错误不在2xx范围
        const {response} = error
        if(response) {
            errorHandle(response.status,response.message,
            response.config.baseURL + response.config.url)
        }else{
            console.log('断网错误处理')
            errorLog(`网络异常-${error}`)
        }
        return response ? Promise.reject(response) : Promise.reject(error)
    }
)
export default service