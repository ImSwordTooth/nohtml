// Nohtml的结构页，使用antd的layout确定页面的页眉、主体和页脚
import React from 'react';
import {connect} from 'react-redux'
import store from './store/index'
import {withRouter}  from 'react-router-dom'
import {Input, Layout} from 'antd'
import MyHeader from './components/nohtml/headers/myHeader'
import MySider from './components/nohtml/sider/MySider'
import MyContent from './components/nohtml/content/myContent'
import MyFooter from './components/nohtml/footer/myFooter'

import './css/nohtml.less'
import {updateSetting, changeNav} from "./store/action";

const { Content, Footer, Sider } = Layout;

 class Nohtml extends React.Component{

    state = {
        isReName:false
    };

    componentDidMount() {
        changeNav('detail');
    }

    componentWillUnmount() {
        changeNav('');
    }

    toggleIsReName = ()=>{
        const {isReName} = this.state
        this.setState({isReName: !isReName})
    }

    changeFileName = (e)=>{
        const {updateSetting} = this.props
        updateSetting({prop:'fileName',value:e.target.value})
    }

    render() {
        const {history,setting} = this.props
        const {isReName} = this.state
        return (
            <Layout className={'App'} style={{paddingTop:0}}>
                <div className={'topBar'}>
                    <i className={'iconfont iconreturn'} onClick={()=>history.goBack()}/>
                    <div className={'fileName_wp'}>
                        {
                            isReName
                                ?<Input value={setting.fileName} style={{width:120}} autoFocus={true} onChange={this.changeFileName} onPressEnter={this.toggleIsReName}/>
                                :<><span className={'fileName'}>{setting.fileName}</span><i className={'iconfont iconrename'} onClick={this.toggleIsReName}/></>
                        }
                    </div>
                    <span/>
                </div>
                <MyHeader/>
                <Content>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <MySider/>
                        </Sider>
                        <Content id={'content'} className={'content'}>
                            <MyContent/>
                        </Content>
                    </Layout>
                </Content>
                <Footer className={'footer'}>
                    <MyFooter/>
                </Footer>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    const {setting} = state;
    return {setting}
}

function mapDispatchToProps() {
    return{
        updateSetting
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Nohtml))
