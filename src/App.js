import React from 'react'
import {Badge} from "antd";
import store from './store'
import {BrowserRouter as Router,Switch,Route,Link}  from 'react-router-dom'
import Nocss from "./nocss";
import Logo from './logo'
import './css/app.less'
import Html from "./index/html";
import LoginModal from "./components/commonModals/loginModal";

import {changeNav} from "./store/action";


class App extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            navName:'home',
            showLoginModal:false,
            active:''
        });
        store.subscribe(this.listen);
    }

    listen = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    componentWillMount () {
        window.addEventListener('beforeunload', this.beforeunload);
        if (sessionStorage.getItem('nav')){
            changeNav(sessionStorage.getItem('nav'))
        }
    }
    componentWillUnmount () {
        window.removeEventListener('beforeunload', this.beforeunload);
    }
    beforeunload  = () =>{
        sessionStorage.setItem('nav', this.state.nav);
    };



    render() {
        return (
            <Router>
                <div className={'header_wp'}>
                    <div className={'left'}>
                        <Logo/>
                        <ul className={'nav'}>
                            <li className={this.state.nav==='home'?'active':''}>
                                <Link to={'/'} onClick={()=>changeNav('home')}>
                                    <i className={'iconfont iconhome'}/>
                                    home
                                </Link>
                            </li>
                            <li className={this.state.nav==='nohtml'?'active':''}>
                                <Link to={'/nohtml'} onClick={()=>changeNav('nohtml')}>
                                    <i className={'iconfont iconhtml'}/>
                                    nohtml
                                </Link>
                            </li>
                            <li className={this.state.nav==='nocss'?'active':''}>
                                <Link to={'/nocss'} onClick={()=>changeNav('nocss')}>
                                    <i className={'iconfont iconcss'}/>
                                    nocss
                                </Link>
                            </li>
                            <li className={this.state.nav==='discuss'?'active':''}>
                                <Link to={'/discuss'} onClick={()=>changeNav('discuss')}>
                                    <i className={'iconfont icondiscuss'}/>
                                    讨论区
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={'right'}>
                        <i className={'iconfont icongithub'}/>
                        <Badge count={5} overflowCount={10} offset={[-5,5]}>
                            <i className={'iconfont icondiscuss'}/>
                        </Badge>


                        <div className={'userInfo'}>
                            <a onClick={()=>this.setState({showLoginModal:true})} className={'loginLink'}>登录</a>
                            {/*<img src={require('./logo.png')} alt={'剑齿'}/>*/}
                            {/*<span>剑齿</span>*/}
                        </div>
                    </div>
                    <LoginModal showLoginModal={this.state.showLoginModal} cancel={()=>this.setState({showLoginModal:false})}/>

                </div>

                <Switch>
                    <Route path="/nocss">
                        <Nocss />
                    </Route>
                    <Route path="/nohtml">
                        <Html />
                    </Route>

                </Switch>
            </Router>
        )
    }

}


export default App;
