export const defaultState = {
    showDrawer:false,
    tagList:{
        type:'div',
        pid:null,
        key:'0',
        dataName:'总容器',
        iconName:'icondiv',
        trueStyle:{},       //放在标签内的样式
        viewStyle:{},       //用于数据展示的样式
        props:{},
        children:[
            {
                type:'div',
                pid:'0',
                key:'0-0',
                dataName:'页头',
                iconName:'icondiv',
                // content:'我是新建div的内容',
                trueStyle:{fontFamily:'幼圆',display:'flex',alignItems:'center',justifyContent:'space-between',height:`${60/14*0.6}rem`},
                viewStyle:{fontFamily:'幼圆',display:'flex',alignItems:'center',justifyContent:'space-between',height:'60px'},
                props:{},
                children:[
                    {
                        type:'div',
                        pid:'0-0',
                        key:'0-0-0',
                        dataName:'logo',
                        iconName:'icondiv',
                        trueStyle:{},
                        viewStyle:{},
                        props:{},
                        children:[
                            // {
                                // type:'img',
                                // pid:'0-0-0',
                                // key:'0-0-0-0',
                                // dataName:'logo图片',

                            // }
                        ]
                    },
                    {
                        type:'div',
                        pid:'0-0',
                        key:'0-0-1',
                        dataName:'用户信息部分',
                        iconName:'icondiv',
                        trueStyle:{},
                        viewStyle:{},
                        props:{},
                        children:[]
                    }
                ]
            },
            {
                type:'div',
                pid:'0',
                key:'0-1',
                dataName:'主体',
                iconName:'icondiv',
                trueStyle:{},
                viewStyle:{},
                props:{},

                children:[
                    {
                        type:'div',
                        pid:'0-1',
                        key:'0-1-0',
                        dataName:'侧边栏',
                        iconName:'icondiv',
                        content:'我是新建段落2的内容',
                        trueStyle:{fontSize:`${18/14*0.6}rem`,backgroundColor:'#ffffff',fontWeight:'lighter',fontStyle:'italic',textDecoration:'underline'},
                        viewStyle:{fontSize:`18px`,backgroundColor:'#ffffff',fontWeight:'lighter',fontStyle:'italic',textDecoration:'underline'},
                        props:{},
                        children:[]
                    },
                    {
                        type:'div',
                        pid:'0-1',
                        key:'0-1-1',
                        dataName:'主体内容',
                        iconName:'icondiv',
                        content:'我是新建段落2的内容',
                        trueStyle:{fontSize:`${18/14*0.6}rem`,backgroundColor:'#ffffff',fontWeight:'lighter',fontStyle:'italic',textDecoration:'underline'},
                        viewStyle:{fontSize:`18px`,backgroundColor:'#ffffff',fontWeight:'lighter',fontStyle:'italic',textDecoration:'underline'},
                        props:{},
                        children:[]
                    }
                ]
            },
            {
                type:'div',
                pid:'0',
                key:'0-2',
                dataName:'页脚',
                iconName:'icondiv',
                trueStyle:{position:''},
                viewStyle:{},
                props:{},
                children:[]
            }
        ]
    },
    selectedTag:{},
    hoveredTagKey:'',       //在树结构上hover的元素的key值，用于与content部分选中样式搭配

}

var scale = defaultState.scale
