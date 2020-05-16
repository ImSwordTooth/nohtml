// Nohtml的结构页，使用antd的layout确定页面的页眉、主体和页脚
import React from 'react';
import {withRouter}  from 'react-router-dom'
import {connect} from 'react-redux'
import {Input, Layout, message, Spin} from 'antd'
import MyHeader from './components/nohtml/headers/myHeader'
import MySider from './components/nohtml/sider/MySider'
import MyContent from './components/nohtml/content/myContent'
import MyFooter from './components/nohtml/footer/myFooter'

import './css/nohtml.less'
import {updateSetting, changeNav} from "./store/action";
import http from "./common/http";
import {loadFile} from "./common/units";
import store from "./store";

const { Content, Footer, Sider } = Layout;

 class Nohtml extends React.Component{

    state = {
        fileName:'新建html',
        isLoading: false,
        isReName:false
    };

    componentDidMount() {
        changeNav('detail');
        const state = this.props.history.location.state
        console.log(state)
        if (state && state.url){
            this.getFile(state)
        }else {
            loadFile(store.getState())
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.history !== this.props.history){
            console.log(this.props.history)
        }
    }

    componentWillUnmount() {
        changeNav('');
    }

    getFile = (locationState)=>{
        const {updateSetting} = this.props
        const {url,name} = locationState
        this.setState({
            fileName:name,
            isLoading:true
        })
        http.get('getFile',{
            filePath:url
        }).then(res=>{
            if (res.data.status === 200){
                loadFile(res.data.data)
                updateSetting({
                    prop:'fileUrl',
                    value:url
                })
            }else {
                message.error('获取文件信息失败')
            }
            this.setState({
                isLoading:false
            })
        })
    }

    toggleIsReName = ()=>{
        const {isReName} = this.state
        const {history:{location:{state}},loginStatus} = this.props

        if (loginStatus === 2){
            const {id} = state
            const {fileName} = this.state
            this.setState({isReName: !isReName},()=>{
                if(isReName){
                    http.get('updateNohtmlProjectList',{
                        projectId:id,
                        projectName:fileName
                    }).then(res=>{
                        if (res.data.status === 200){
                            message.success('修改成功！')
                        }
                    })
                }
            })
        }else {
            this.setState({
                isReName: !isReName
            })
        }
    }

    changeFileName = (e)=>{
        this.setState({
            fileName:e.target.value
        })
    }

    render() {
        const {history,setting} = this.props
        const {isReName,isLoading,fileName} = this.state
        return (
            <Layout className={'App'} style={{paddingTop:0}}>
                <div className={'topBar'}>
                    <i className={'iconfont iconreturn'} onClick={()=>history.goBack()}/>
                    <div className={'fileName_wp'}>
                        {
                            isReName
                                ?<Input value={fileName} style={{width:120}} autoFocus={true} onChange={this.changeFileName} onPressEnter={this.toggleIsReName}/>
                                :<><span className={'fileName'}>{fileName}</span><i className={'iconfont iconrename'} onClick={this.toggleIsReName}/></>
                        }
                    </div>
                    <span/>
                </div>
                <MyHeader/>
                <Content>
                    <Spin spinning={isLoading}>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <MySider/>
                        </Sider>
                        <Content id={'content'} className={'content'}>
                            <MyContent/>
                        </Content>
                    </Layout>
                    </Spin>
                </Content>
                <Footer className={'footer'}>
                    <MyFooter/>
                </Footer>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    const {loginStatus} = state;
    return {loginStatus}
}

function mapDispatchToProps() {
    return {
        updateSetting
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Nohtml))
