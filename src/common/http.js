import axios from 'axios'
import qs from 'qs'

const http = {
    post:null,
    get:null
};

axios.defaults.headers['Content-Type']='multipart/form-data'

http.get = function (url,data) {
    return new Promise((resolve,reject) => {
        axios.get(`http://www.swordtooth.cn/in${url}`,{
            params:data
        }).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
};

http.post = function (url,data) {
    return new Promise((resolve,reject) => {
        axios.post(`http://www.swordtooth.cn/in${url}`,
            qs.stringify(data),
            { headers:{ 'Content-Type':'application/x-www-form-urlencoded' }}
            ).then(res=>{
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
};

export default http;
