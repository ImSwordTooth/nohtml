// 路由主页以及共用的页眉
import React from 'react'
import store from './store'
import {BrowserRouter as Router,Switch,Route,Link}  from 'react-router-dom'
import Nocss from "./nocss";
import Home from "./home";
import Nohtml from "./nohtml";
import Login from "./login";
import UserInfo from "./components/other/userInfo";
import http from "./common/http";
import './css/app.less'
import {connect} from 'react-redux'
import NohtmlIndex from "./nohtmlIndex";
import {changeLoginStatus, changeUser} from "./store/action";

class App extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount () {
        if (sessionStorage.getItem('haveLogin') === 'true'){            //用户已经登录过了，刷新的时候重新获取用户状态

            const {changeLoginStatus,changeUser} = this.props
            changeLoginStatus(2);
            http.get('/getUserInfo').then(res=>{
                console.log(res)
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
        const {loginStatus,user} = this.props;
        switch (loginStatus) {
            case 0 :return(                         //用户未登录，则显示“登录”链接
                <Link to={'/login'}>
                    <div className={'loginInfo'}>
                        <span className={'loginLink'}>登录</span>
                    </div>
                </Link>
            );
            case 2:return(                          //用户已登录，则显示用户信息和个人页面的入口，TODO 以及退出登录的按钮，退出时记得把sessionStorage里的haveLogin置为false
                <div className={'loginInfo'}>
                    <img src={user.avatar} alt={user.userName} className={'loginAvatar'}/>
                    <span className={'loginLink'}>{user.userName}</span>
                    <div className={'logout'} onClick={this.logout}>
                        <i className={'iconfont icondelete delete'}/>
                    </div>
                </div>
            );
            default:return <></>
        }
    };

    goToGithub = ()=>{
        window.open('https://github.com/ImSwordTooth/nohtml')
    }

    logout = ()=>{
        const {loginStatus,changeLoginStatus,changeUser} = this.props
        http.get('logout').then(res=>{
            changeLoginStatus(0)
            sessionStorage.setItem('haveLogin','false')
            changeUser({})
        })
    }


    render() {
        const {loginStatus,nav} = this.props;
        return (
                <Router>
                    {
                        nav === 'detail'
                            ?<></>
                            :<>
                                <Link to={'/'}>
                                    <div className={`logo_wp ${loginStatus === 1 ? 'loginLogo' : ''}`} id={'logo'}>
                                        <img src={require('./asset/logo.png')} alt={'logo'} className={'logo'}/>
                                        {
                                            loginStatus === 1
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
                                    <div className={'right_part'} style={nav === 'nohtml' ? {} : {justifyContent:'flex-end',width:'100%'}}>
                                        <ul className={'nav'}>
                                            <li className={nav === 'nohtml'?'active':''}>
                                                <Link to={`/nohtml`}>
                                                    <i className={'iconfont iconhtml'}/>
                                                    NoHtml
                                                </Link>
                                            </li>
                                            <li className={nav === 'nocss'?'active':''}>
                                                <Link to={`/nocss`}>
                                                    <i className={'iconfont iconcss'}/>
                                                    NoCss
                                                </Link>
                                            </li>
                                        </ul>
                                        <i className={'iconfont icongithub'} onClick={this.goToGithub}/>
                                        {this.loginContent()}
                                    </div>
                                </div>
                            </>
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
                        <Route exact path={`/nohtml/detail`}>
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

function mapStateToProps(state) {
    const {loginStatus,user,nav} = state;
    return {loginStatus,user,nav}
}

function mapDispatchToProps() {
    return{
        changeLoginStatus,
        changeUser
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
