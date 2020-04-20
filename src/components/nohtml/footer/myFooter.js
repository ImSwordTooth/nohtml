import React,{PureComponent} from 'react'
import './myFooter.less'
import {Breadcrumb} from 'antd'
import {changeHoveredTag} from "../../../store/action";
import {connect} from 'react-redux'
import {getObjByKeyFromTagList} from "../../../common/units";

class MyFooter extends PureComponent{

    state = {
        path:[
            {
                icon:'icondiv',
                name:'总容器'
            }
        ]
    }

    getPath = ()=>{
        const {selectedTag,changeHoveredTag} = this.props
        let path = [];
        if (JSON.stringify(selectedTag)!=='{}'){
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
        const {tagList} = this.props
        return getObjByKeyFromTagList(key,tagList)
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

function mapStateToProps(state) {
    const {selectedTag,tagList} = state;
    return {selectedTag,tagList}
}

function mapDispatchToProps() {
    return {
        changeHoveredTag
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyFooter)
