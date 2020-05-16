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
    window.ws = new WebSocket(`ws://in.swordtooth.cn/echo`);
    window.ws.onopen = function (evnt) {
        console.log('连接成功')
        let value = {
            functionName:'addUser',
            filePath:store.getState().setting.fileUrl
        };
        window.ws.send(JSON.stringify(value));
    };

    window.ws.onmessage = function (event) {
        console.log(event)
        let data = JSON.parse(event.data)
        if (data.data !== 'null'){
            console.log('进来了')
            let {functionName,userName,args} = data.data;
            if (userName !== store.getState().user.userName){
                import('../store/action').then(def=>{

                    let fn = def[functionName];
                    fn.apply(null,args);
                })
            }
        }

    };
    window.ws.onerror = function (evnt) {
    };
    window.ws.onclose = function (evnt) {
    };
}


export function webSocketLinkServe(functionInfo) {
    console.log(window.ws)
    if (window.ws){
        window.ws.send(JSON.stringify(functionInfo));
        console.log('发送')
    } else {
        new Promise(resolve=>{
            createWebSocket();
            // resolve();
        }).then(()=>{
            webSocketLinkServe(functionInfo);
        })

    }
}
