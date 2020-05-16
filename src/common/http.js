import axios from 'axios'
import qs from 'qs'

const http = {
    post:null,
    get:null
};

axios.defaults.headers['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

http.get = function (url,data) {
    return new Promise((resolve,reject) => {
        axios.get(`http://in.swordtooth.cn/${url}`,{
            params:data,
            withCredentials: true
        }).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
};

http.post = function (url,data) {
    return new Promise((resolve,reject) => {
        axios.post(`http://in.swordtooth.cn/${url}`,
            qs.stringify(data),
            {
                headers:{ 'Content-Type':'application/x-www-form-urlencoded' },
                withCredentials: true
            }
            ).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
};

http.authenticateGet = function (url,data) {
    return new Promise((resolve,reject) => {
        axios.get(`http://47.93.246.89:8888/${url}`,{
            params:data,
            withCredentials: true
        }).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

http.authenticatePost = function (url,data) {
    return new Promise((resolve,reject) => {
        axios.post(`http://47.93.246.89:8888/${url}`,
            qs.stringify(data),
            {
                headers:{ 'Content-Type':'application/x-www-form-urlencoded' },
                withCredentials: true
            }
        ).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

http.updateGet = function (url,data) {
    return new Promise((resolve,reject) => {
        axios.post(`http://upload.swordtooth.cn/${url}`,
            data
        ).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

http.updatePost = function (url,data) {
    return new Promise((resolve,reject) => {
        axios.post(`http://upload.swordtooth.cn/${url}`,
            data
        ).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}

export default http;
