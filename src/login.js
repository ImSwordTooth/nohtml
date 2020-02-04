// 登录页
import React from 'react'
import store from './store'
import './css/login.less'
import {Input, Button, Checkbox, message} from "antd";
import {withRouter}  from 'react-router-dom'
import MyFooter from "./components/footer/myFooter";
import {changeLoginStatus, changeUser} from "./store/action";
import http from './common/http'

const {Password} = Input;
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            isLogin:true,               //是否为登录/注册
            loginLoading:false,         //登录按钮loading
            username:'',                //登录-用户名
            password:'',                //登录-密码
            loginWrong:false,           //是否登录失败
            isAutoLogin:false,          //是否自动登录
            isPhoneLogin:false,         //是否为手机号登录，用于手机登录和用户名登录之间的切换
            phoneNum:'',                //手机号码
        });
        store.subscribe(this.listen);
    }

    listen = ()=>{
        let newState = store.getState();
        this.setState(newState)
    };

    //页面加载完成后，将登录状态置为1，即“正在登录”
    componentDidMount() {
        changeLoginStatus(1);
    }

    //页面销毁前，如果登录状态仍为“正在登录”，则置为“未登录”
    componentWillUnmount() {
        if (this.state.loginStatus === 1){
            changeLoginStatus(0)
        }
    }

    //登录
    login = ()=>{
        this.setState({
            loginLoading:true
        });
        http.post('/login1',{
            username:this.state.username,
            password:this.state.password
        }).then(res=>{
            if (res.data.status === 200){
                this.setState({
                    loginLoading:false
                });
                let {avatar,userId,userName} = res.data.data;
                changeUser({avatar,userId,userName});            //记录用户信息
                changeLoginStatus(2);           //修改登录状态为“登录成功”
                message.success('登录成功！');               //用户反馈
                sessionStorage.setItem('haveLogin','true');             //sessionStorage里存储“已经登录过了”
                this.props.history.push('/')                    //最后把页面定向到主页
            } else {
                message.error('账号或密码错误');
                this.setState({
                    loginWrong:true,
                    username:'',
                    password:''
                });
            }
        }).catch(err=>{
            message.error('账号或密码错误');
            this.setState({
                loginWrong:true,
                username:'',
                password:''
            });
        })
    };

    render() {
        return (
            <div className={'login'}>
                {/*登录*/}
                <div className={`login_wp ${this.state.isLogin?'':'none'} ${this.state.loginWrong?'wrong':''}`}>
                    {
                        this.state.isPhoneLogin
                            ?<>
                                <Input className={'input_wp'}
                                       size={'large'}
                                       placeholder="手机号"
                                       value={this.state.phoneNum}
                                       name={'phoneNum'}
                                       onChange={(e)=>this.setState({phoneNum:e.target.value})}
                                       onFocus={()=>this.setState({loginWrong:false})}
                                       prefix={<i className={'iconfont iconiphone7 inputIcon'} style={{fontSize:'20px'}}/>}
                                />
                                <div className={'spaceBetween'} style={{marginTop:0}}>
                                    <Input className={'input_wp'}
                                              size={'large'}
                                              placeholder="验证码"
                                              name={'password'}
                                              value={this.state.password}
                                              onChange={(e)=>this.setState({password:e.target.value})}
                                              onFocus={()=>this.setState({loginWrong:false})}
                                              prefix={<i className={'iconfont iconloginpassword inputIcon'}/>}
                                    />
                                    <Button size={'large'} style={{marginLeft:20}}>获取验证码</Button>
                                </div>
                            </>
                            :<>
                                <Input className={'input_wp'}
                                       size={'large'}
                                       placeholder="用户名"
                                       value={this.state.username}
                                       name={'username'}
                                       onChange={(e)=>this.setState({username:e.target.value})}
                                       onFocus={()=>this.setState({loginWrong:false})}
                                       onPressEnter={this.login}
                                       prefix={<i className={'iconfont iconloginusername inputIcon'}/>}
                                />
                                <Password className={'input_wp'}
                                          size={'large'}
                                          placeholder="密码"
                                          name={'password'}
                                          value={this.state.password}
                                          onChange={(e)=>this.setState({password:e.target.value})}
                                          onFocus={()=>this.setState({loginWrong:false})}
                                          onPressEnter={this.login}
                                          prefix={<i className={'iconfont iconloginpassword inputIcon'}/>}
                                />
                                <div className={'spaceBetween'}>
                                    <div className={'autoLogin'}>
                                        <Checkbox checked={this.state.isAutoLogin} onChange={()=>this.setState({isAutoLogin:!this.state.isAutoLogin})}/>
                                        <span onClick={()=>this.setState({isAutoLogin:!this.state.isAutoLogin})}>自动登录</span>
                                    </div>
                                    <a href={'#'} onClick={()=>changeLoginStatus(2)}>忘记密码</a>
                                </div>
                            </>
                    }
                    <Button type={'primary'} size={'large'} block loading={this.state.loginLoading} onClick={this.login}>登录</Button>
                    <div className={'spaceBetween'}>
                        <div className={'otherWay'}>
                            其他登录方式：
                            {
                                this.state.isPhoneLogin
                                    ?
                                    <i className={'iconfont iconloginusername'} style={{fontSize:18}} onClick={()=>this.setState({isPhoneLogin:false})} title={'用户名/密码登录'}/>

                                    :
                                    <i className={'iconfont iconiphone7'} onClick={()=>this.setState({isPhoneLogin:true})} title={'手机登录'}/>

                            }
                            <i className={'iconfont iconqq'} title={'QQ登录'}/>
                        </div>
                        <a href={'#'} onClick={()=>this.setState({isLogin:false})}>新用户注册</a>
                    </div>
                </div>
                {/*注册*/}
                <div className={`register_wp ${this.state.isLogin?'none':''}`}>
                    <Input className={'input_wp'}
                           size={'large'}
                           placeholder={'用户名'}
                           prefix={<i className={'iconfont iconloginusername inputIcon'}/>}
                    />
                    <Input.Password className={'input_wp'}
                           size={'large'}
                           placeholder="密码"
                           prefix={<i className={'iconfont iconloginpassword inputIcon'}/>}
                    />
                    <Input.Password className={'input_wp'}
                           size={'large'}
                           placeholder="确认密码"
                           prefix={<i className={'iconfont iconloginrepeatpassword inputIcon'}/>}
                    />
                    <div className={'spaceBetween'}>
                        <Button type={'primary'} style={{width:120}} size={'large'} onClick={()=> this.props.history.push('/')}>注册</Button>
                        <a href={"#"} onClick={()=>this.setState({isLogin:true})}>登录</a>
                    </div>
                </div>
                <MyFooter/>
            </div>
        )
    }
}

export default withRouter(Login);
