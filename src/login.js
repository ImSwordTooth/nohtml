// 登录页
import React from 'react'
import store from './store'
import './css/login.less'
import {Input, Button, Checkbox, message} from "antd";
import {withRouter}  from 'react-router-dom'
import {connect} from 'react-redux'
import MyFooter from "./components/footer/myFooter";
import http from './common/http'
import {changeLoginStatus, changeUser} from "./store/action";

const {Password} = Input;
class Login extends React.Component{

    state = {
        isLogin:true,               //是否为登录/注册
        loginLoading:false,         //登录按钮loading
        username:'',                //登录-用户名
        password:'',                //登录-密码
        loginWrong:false,           //是否登录失败
        isAutoLogin:false,          //是否自动登录
        isPhoneLogin:false,         //是否为手机号登录，用于手机登录和用户名登录之间的切换
        phoneNum:'',
    }

    //页面加载完成后，将登录状态置为1，即“正在登录”
    componentDidMount() {
        changeLoginStatus(1);
    }

    //页面销毁前，如果登录状态仍为“正在登录”，则置为“未登录”
    componentWillUnmount() {
        const {loginStatus,changeLoginStatus} = this.props;
        if (loginStatus === 1){
            changeLoginStatus(0)
        }
    }

    //登录
    login = ()=>{
        const {changeUser,changeLoginStatus,history} = this.props;
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
                history.push('/')                    //最后把页面定向到主页
            } else {
                message.error('账号或密码错误');
                this.setState({
                    loginLoading:false,
                    loginWrong:true,
                    username:'',
                    password:''
                });
            }
        }).catch(()=>{
            message.error('账号或密码错误');
            this.setState({
                loginLoading:false,
                loginWrong:true,
                username:'',
                password:''
            });
        })
    };

    changeText = (e)=>{
        this.setState({[e.target.dataset.statename]:e.target.value})
    }

    cancelLoginWrong = ()=>{
        this.setState({loginWrong:false})
    };

    toggleIsAutoLogin = ()=>{
        const {isAutoLogin} = this.state;
        this.setState({isAutoLogin: !isAutoLogin})
    };

    render() {
        const {history} = this.props;
        const {isLogin,loginWrong,password,username,isAutoLogin,loginLoading,isPhoneLogin,phoneNum} = this.state;
        return (
            <div className={'login'}>
                {/*登录*/}
                <div className={`login_wp ${isLogin?'':'none'} ${loginWrong?'wrong':''}`}>
                    {
                        isPhoneLogin
                            ?<>
                                <Input className={'input_wp'}
                                       data-statename={'phoneNum'}
                                       size={'large'}
                                       placeholder="手机号"
                                       value={phoneNum}
                                       name={'phoneNum'}
                                       onChange={this.changeText}
                                       onFocus={this.cancelLoginWrong}
                                       prefix={<i className={'iconfont iconiphone7 inputIcon'} style={{fontSize:'20px'}}/>}
                                />
                                <div className={'spaceBetween'} style={{marginTop:0}}>
                                    <Input className={'input_wp'}
                                           data-statename={'password'}
                                           size={'large'}
                                           placeholder="验证码"
                                           name={'password'}
                                           value={password}
                                           onChange={this.changeText}
                                           onFocus={this.cancelLoginWrong}
                                           prefix={<i className={'iconfont iconloginpassword inputIcon'}/>}
                                    />
                                    <Button size={'large'} style={{marginLeft:20}}>获取验证码</Button>
                                </div>
                            </>
                            :<>
                                <Input className={'input_wp'}
                                       data-statename={'username'}
                                       size={'large'}
                                       placeholder="用户名"
                                       value={username}
                                       name={'username'}
                                       onChange={this.changeText}
                                       onFocus={this.cancelLoginWrong}
                                       onPressEnter={this.login}
                                       prefix={<i className={'iconfont iconloginusername inputIcon'}/>}
                                />
                                <Password className={'input_wp'}
                                          data-statename={'password'}
                                          size={'large'}
                                          placeholder="密码"
                                          name={'password'}
                                          value={password}
                                          onChange={this.changeText}
                                          onFocus={this.cancelLoginWrong}
                                          onPressEnter={this.login}
                                          prefix={<i className={'iconfont iconloginpassword inputIcon'}/>}
                                />
                                <div className={'spaceBetween'}>
                                    <div className={'autoLogin'}>
                                        <Checkbox checked={isAutoLogin} onChange={this.toggleIsAutoLogin}/>
                                        <span onClick={this.toggleIsAutoLogin}>自动登录</span>
                                    </div>
                                    <a href={'#'}>忘记密码</a>
                                </div>
                            </>
                    }
                    <Button type={'primary'} size={'large'} block loading={loginLoading} onClick={this.login}>登录</Button>
                    <div className={'spaceBetween'}>
                        <div className={'otherWay'}>
                            其他登录方式：
                            {
                                isPhoneLogin
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
                <div className={`register_wp ${isLogin?'none':''}`}>
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
                        <Button type={'primary'} style={{width:120}} size={'large'} onClick={()=> history.push('/')}>注册</Button>
                        <a href={"#"} onClick={()=>this.setState({isLogin:true})}>登录</a>
                    </div>
                </div>
                <MyFooter/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {loginStatus} = state;
    return {loginStatus}
}

function mapDispatchToProps() {
    return{
        changeLoginStatus,
        changeUser
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login));
