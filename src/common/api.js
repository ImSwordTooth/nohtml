import axios from 'axios'
import store from '../store'

export function UploadFile(file) {
    axios.post('http://upload.swordtooth.cn//uploadFile',{
        file
    },{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res)=>{
        return res
    })
}

function createWebSocket(url) {
    window.ws = new WebSocket(`ws://www.swordtooth.cn/in/echo`);
    window.ws.onopen = function (evnt) {
        let value = {
            userName:'',
            functionName:'addUser',
            filePath:store.getState().setting.fileUrl
        };
        window.ws.send(JSON.stringify(value));
    };

    window.ws.onmessage = function (event) {
        let {functionName,userName,args} = JSON.parse(event.data);
        if (userName !== store.getState().user.userName){
            import('../store/action').then(def=>{
                let fn = def[functionName];
                fn.apply(null,args);
            })
        }
    };

    window.ws.onerror = function (evnt) {
    };
    window.ws.onclose = function (evnt) {
    };
}


export function webSocketLinkServe(functionInfo) {
    if (window.ws){
        window.ws.send(JSON.stringify(functionInfo));
    } else {
        new Promise(resolve=>{
            createWebSocket();
            resolve();
        }).then(()=>{
            webSocketLinkServe(functionInfo);
        })

    }
}
