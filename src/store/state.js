export default {
    showDrawer:false,
    tagList:{
        type:'div',
        pid:null,
        key:'0',
        dataName:'总容器',
        style:{},
        props:{},
        children:[
            {
                type:'div',
                pid:'0',
                key:'0-0',
                dataName:'新建div',
                content:'我是新建div的内容',
                style:{backgroundColor:'#265910',color:'white',fontFamily:'幼圆'},
                props:{},
                children:[
                    {
                        type:'p',
                        pid:'0-0',
                        key:'0-0-0',
                        dataName:'新建p',
                        style:{},
                        props:{},
                        children:[]
                    }
                ]
            },
            {
                type:'div',
                pid:'0',
                key:'0-2',
                dataName:'新建div',
                style:{},
                props:{},
                children:[
                    {
                        type:'p',
                        pid:'0-2',
                        key:'0-2-0',
                        dataName:'新建段落2',
                        content:'我是新建段落2的内容',
                        style:{color:'red',fontSize:'28px'},
                        props:{},
                        children:[]
                    }
                ]
            },
            {
                type:'div',
                pid:'0',
                key:'0-1',
                dataName:'新建div',
                style:{},
                props:{},
                children:[]
            }
        ]
    },
    selectedTag:{},
    hoveredTagKey:'',       //在树结构上hover的元素的key值，用于与content部分选中样式搭配

}
