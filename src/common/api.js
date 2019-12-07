import axios from 'axios'

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
