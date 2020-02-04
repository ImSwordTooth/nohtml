// Nohtml的结构页，使用antd的layout确定页面的页眉、主体和页脚
import React from 'react';
import { Provider } from 'react-redux'
import store from './store/index'
import {withRouter}  from 'react-router-dom'
import {Input, Layout} from 'antd'
import MyHeader from './components/nohtml/headers/myHeader'
import MySider from './components/nohtml/sider/mySider'
import MyContent from './components/nohtml/content/myContent'
import MyFooter from './components/nohtml/footer/myFooter'
import './css/nohtml.less'
import {changeNav, updateSetting} from "./store/action";

const { Content, Footer, Sider } = Layout;

 class Nohtml extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            isReName:false
        });
        store.subscribe(this.listen);
    }

    listen = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    componentDidMount() {
        changeNav('detail');
    }

    componentWillUnmount() {
        changeNav('');
    }

    render() {
        return (
            <Provider store={store}>
                <Layout className={'App'} style={{paddingTop:0}}>
                    <div className={'topBar'}>
                        <i className={'iconfont iconreturn'} onClick={()=>this.props.history.goBack()}/>
                        <div className={'fileName_wp'}>
                            {
                                this.state.isReName
                                    ?<Input value={this.state.setting.fileName} style={{width:120}} autoFocus={true} onChange={(e)=>updateSetting({prop:'fileName',value:e.target.value})} onPressEnter={()=>this.setState({isReName:false})}/>
                                    :<><span className={'fileName'}>{this.state.setting.fileName}</span><i className={'iconfont iconrename'} onClick={()=>this.setState({isReName:true})}/></>
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
            </Provider>
        );
    }
}

export default withRouter(Nohtml)
