export const defaultState = {
    nav:'home',
    showDrawer:false,
    showCode:false,
    setting:{
      width:'60vw',
      height:'60vh'
    },
    tagList:{
        type:'div',
        pid:null,
        key:'0',
        dataName:'总容器',
        iconName:'icondiv',     //标签的图标
        trueStyle:{},       //放在标签内的样式
        viewStyle:{},       //用于数据展示的样式
        hoverTrueStyle:{},      //hover时放在标签内的样式
        hoverViewStyle:{},      //hover时用于数据展示的样式
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
                hoverTrueStyle:{},
                hoverViewStyle:{},
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
                        hoverTrueStyle:{},
                        hoverViewStyle:{},
                        props:{},
                        children:[
                            {
                                type:'img',
                                pid:'0-0-0',
                                key:'0-0-0-0',
                                dataName:'logo图片',
                                iconName:'iconimg',
                                trueStyle:{width:`${60/14*0.6}rem`},
                                viewStyle:{width:'60px'},
                                hoverTrueStyle:{},
                                hoverViewStyle:{},
                                props:{
                                    src:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2035944494,3453366933&fm=26&gp=0.jpg'
                                }
                            }
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
                        hoverTrueStyle:{},
                        hoverViewStyle:{},
                        props:{},
                        children:[
                            {
                                type:'img',
                                pid:'0-0-1',
                                key:'0-0-1-0',
                                dataName:'头像',
                                iconName:'iconimg',
                                trueStyle:{width:`${60/14*0.6}rem`,border:`solid ${1/14*0.6}rem #cccccc`,borderRadius:'100%'},
                                viewStyle:{width:'60px',border:'solid 1px #cccccc',borderRadius:'100%'},
                                hoverTrueStyle:{},
                                hoverViewStyle:{},
                                props:{
                                    src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572435050159&di=e849863eeca637da14272395b9118f8c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F07%2F20180607185957_fjrFt.thumb.700_0.jpeg'
                                }

                            }
                        ]
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
                hoverTrueStyle:{},
                hoverViewStyle:{},
                props:{},
                children:[
                    {
                        type:'div',
                        pid:'0-1',
                        key:'0-1-0',
                        dataName:'侧边栏',
                        iconName:'icondiv',
                        content:'我是侧边栏',
                        trueStyle:{fontSize:`${18/14*0.6}rem`,backgroundColor:'#ffffff',fontWeight:'lighter',fontStyle:'italic',textDecoration:'underline'},
                        viewStyle:{fontSize:`18px`,backgroundColor:'#ffffff',fontWeight:'lighter',fontStyle:'italic',textDecoration:'underline'},
                        hoverTrueStyle:{},
                        hoverViewStyle:{},
                        props:{

                        },
                        children:[]
                    },
                    {
                        type:'div',
                        pid:'0-1',
                        key:'0-1-1',
                        dataName:'主体内容',
                        iconName:'icondiv',
                        content:'我是主体内容',
                        trueStyle:{backgroundColor:'#ffffff',fontWeight:'lighter',fontStyle:'italic',textDecoration:'underline'},
                        viewStyle:{backgroundColor:'#ffffff',fontWeight:'lighter',fontStyle:'italic',textDecoration:'underline'},
                        hoverTrueStyle:{color:'blue'},
                        hoverViewStyle:{color:'blue'},
                        props:{
                            className:['init','test']
                        },
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
                hoverTrueStyle:{},
                hoverViewStyle:{},
                viewStyle:{},
                props:{},
                children:[]
            }
        ]
    },
    selectedTag:{},
    hoveredTagKey:'',       //在树结构上hover的元素的key值，用于与content部分选中样式搭配
    classList:[               //nohtml中的类列表
        {
            className:'init',
            tag:'none',
            parentClass:'none',
            relation:' ',
            trueStyle:{color:'blue'},
            viewStyle:{color:'blue'},
            hoverTrueStyle:{},
            hoverViewStyle:{},
        },
        {
            className:'test',
            tag:'button',
            parentClass:'init',
            relation:'+',
            trueStyle:{
                color:'rgba(255,0,0,.3)',
                fontSize:`${36/14*0.6}rem`,
                fontWeight:'bold',
            },
            viewStyle:{
                color:'rgba(255,0,0,.3)',
                fontSize:'36px',
                fontWeight:'bold'
            },
            hoverTrueStyle:{
                color:'purple'
            },
            hoverViewStyle:{
                color:'purple'
            }
        }
    ],
    nocssStyle:{
        color:'#1082c9',
        backgroundColor:'rgba(230,230,230,0.3)',
        fontSize:'32px',
        fontWeight:'lighter',
        fontStyle:'normal',
        textDecoration:'none',
        border:'2px dashed #000000',
        padding:'4px 6px 4px 6px',
        boxShadow:'0px 0px 24px 0px rgba(0,0,0,0.32),5px 5px 14px 0px rgba(13,71,134,0.2)',
        textShadow:'1px 0px 0px #000000,0px 3px 5px rgba(70,117,214,0.5)',
        transform:'rotate(20deg) translate(0px,40px)'
    },
    hoverStyle:{

    },
    hoverList:{

    }

};
