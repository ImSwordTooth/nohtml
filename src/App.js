// 路由主页以及共用的页眉
import React from 'react'
import store from './store'
import {BrowserRouter as Router,Switch,Route,Link,useRouteMatch,withRouter}  from 'react-router-dom'
import { browserHistory } from 'react-router';
import Nocss from "./nocss";
import {changeLoginStatus, changeNav, changeUser, updateSetting} from "./store/action";
import Home from "./home";
import Nohtml from "./nohtml";
import Login from "./login";
import UserInfo from "./components/other/userInfo";
import http from "./common/http";
import './css/app.less'
import {Input, message, Tag} from "antd";
import NohtmlIndex from "./nohtmlIndex";

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            pathname:window.location.pathname,
            navName:'home',
            showLoginModal:false,
            active:'',
            isLogin:false,
            isReName:false
        });
        store.subscribe(this.listen);
    }

    listen = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    componentWillMount () {
        if (sessionStorage.getItem('haveLogin') === 'true'){            //用户已经登录过了，刷新的时候重新获取用户状态
            http.get('/getUserInfo').then(res=>{
                console.log(res)
                changeLoginStatus(2);
                let {avatar,userId,userName} = res.data.data;
                changeUser({
                    avatar,
                    userId,
                    userName
                });
            })

        }
    }

    //右上角登录部分显示的元素
    loginContent = ()=>{
        switch (this.state.loginStatus) {
            case 0 :return(                         //用户未登录，则显示“登录”链接
                <Link to={'/login'}>
                    <div className={'loginInfo'}>
                        <span className={'loginLink'}>登录</span>
                    </div>

                </Link>
            );
            case 2:return(                          //用户已登录，则显示用户信息和个人页面的入口，TODO 以及退出登录的按钮，退出时记得把sessionStorage里的haveLogin置为false
                <Link to={'/userInfo'} className={'loginInfo'}>
                    <img src={this.state.user.avatar} alt={this.state.user.userName} className={'loginAvatar'}/>
                    <span className={'loginLink'}>{this.state.user.userName}</span>
                </Link>
            );
            default:return <></>
        }
    };

    render() {
        return (
                <Router>
                    {
                        this.state.nav === 'detail'
                        ?<></>
                            :<><Link to={'/'}>
                                <div className={`logo_wp ${this.state.loginStatus === 1 ? 'loginLogo' : ''}`} id={'logo'}>
                                    <img src={require('./asset/logo.png')} alt={'logo'} className={'logo'}/>
                                    {
                                        this.state.loginStatus === 1
                                            ?<div className={'none logoText '}>
                                                <span className={'logoTitle'}>NoHtml</span>
                                                <div className={'logoSubtitle'}>
                                                    <span>多人</span>
                                                    <span>云端</span>
                                                    <span>可视化</span>
                                                </div>
                                            </div>
                                            :<></>
                                    }
                                </div>
                            </Link>

                                <div className={'header_wp'}>
                                    {
                                        this.state.nav === 'detail'
                                            ?<>
                                                <ul className={'functionList'}>
                                                    <li>新建</li>
                                                    <li>保存</li>
                                                    <li>文件列表</li>
                                                    <li>123456</li>
                                                </ul>
                                                <div className={'fileName_wp'}>
                                                    {
                                                        this.state.isReName
                                                            ?<Input value={this.state.setting.fileName} style={{width:120}} autoFocus={true} onChange={(e)=>updateSetting({prop:'fileName',value:e.target.value})} onPressEnter={()=>this.setState({isReName:false})}/>
                                                            :<><span className={'fileName'}>{this.state.setting.fileName}</span><i className={'iconfont iconrename'} onClick={()=>this.setState({isReName:true})}/></>
                                                    }
                                                </div>

                                            </>
                                            :<></>
                                    }

                                    <div className={'right_part'} style={this.state.nav === 'nohtml' ? {} : {justifyContent:'flex-end',width:'100%'}}>
                                        <ul className={'nav'}>
                                            <li className={this.state.nav==='nohtml'?'active':''}>
                                                <Link to={`/nohtml`}>
                                                    <i className={'iconfont iconhtml'}/>
                                                    NoHtml
                                                </Link>
                                            </li>
                                            <li className={this.state.nav==='nocss'?'active':''}>
                                                <Link to={`/nocss`}>
                                                    <i className={'iconfont iconcss'}/>
                                                    NoCss
                                                </Link>
                                            </li>
                                        </ul>
                                        <i className={'iconfont icongithub'} onClick={()=>window.open('https://github.com/ImSwordTooth/nohtml')}/>
                                        {this.loginContent()}
                                    </div>

                                </div></>
                    }


                    <Switch>
                        <Route exact path={"/"}>
                            <Home/>
                        </Route>
                        <Route exact path={"/login"}>
                            <Login/>
                        </Route>
                        <Route exact path={'/userInfo'}>
                            <UserInfo/>
                        </Route>
                        <Route exact path={`/nohtml`}>
                            <NohtmlIndex/>
                        </Route>
                        <Route exact path={`/nohtml/detail/:id`}>
                            <Nohtml/>
                        </Route>
                        <Route exact path={`/nocss`}>
                            <Nocss/>
                        </Route>
                    </Switch>
                </Router>
        )
    }

}

export default App;
