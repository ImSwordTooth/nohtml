import React from 'react'
import './myFooter.less'
import store from '../../../store'
import {Breadcrumb, Tree} from 'antd'
import {changeHoveredTag} from "../../../store/action";

class MyFooter extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            path:[
                {
                    icon:'icondiv',
                    name:'总容器'
                }
            ]
        })
        store.subscribe(this.listener)
    }

    listener = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    getPath = ()=>{
        let path = [];
        if (JSON.stringify(this.state.selectedTag)!=='{}'){
            let selectedTag = this.state.selectedTag;
            let selectedKeyArr = selectedTag.key.split('-');
            selectedKeyArr.shift();
            for (let i=0; i<selectedKeyArr.length; i++){
                let tag = this.getTagInfo('0-'+selectedKeyArr.slice(0,i+1).join('-'));
                path.push({
                    key:tag.key,
                    icon:tag.iconName,
                    name:tag.dataName
                })
            }
        }
        return (
            <Breadcrumb separator={'>'}>
                <Breadcrumb.Item
                    onMouseEnter={(e)=>{changeHoveredTag('0')}}
                    onMouseLeave={()=>{changeHoveredTag('')}}><i className={'iconfont icondiv'}/>总容器</Breadcrumb.Item>
                {
                    path.map((item,index)=>{
                        return <Breadcrumb.Item key={index}
                                                onMouseEnter={(e)=>{changeHoveredTag(item.key)}}
                                                onMouseLeave={()=>{changeHoveredTag('')}}><i className={`iconfont ${item.icon}`}/>{item.name}</Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        )
    }


     getTagInfo = (key)=>{
        let getTagArr = Object.assign([],store.getState().tagList);
        //对每一层递归，根据key值找到目标对象
        const getTargetObj = function (obj) {
            if (obj.key === key){
                return obj;
            } else {
                for (let i=0;i<obj.children.length;i++){
                    if (key.indexOf(obj.children[i].key)===0){
                        return getTargetObj(obj.children[i]);
                    }
                }
            }
        };

        return getTargetObj(getTagArr);
    }

    render() {
        return (
            <div className={'footer_wp'}>
                <div className={'nodeList'}>
                    {
                        this.getPath()
                    }
                    {/*<Breadcrumb separator={'>'}>*/}
                        {/*<Breadcrumb.Item><i className={'iconfont icondiv'}/>侧边栏</Breadcrumb.Item>*/}
                        {/*<Breadcrumb.Item><i className={'iconfont icondiv'}/>侧边栏</Breadcrumb.Item>*/}
                        {/*<Breadcrumb.Item><i className={'iconfont icondiv'}/>侧边栏</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}


                </div>

            </div>
        )
    }
}

export default MyFooter
