// 登录页
import React from 'react'
import './css/login.less'
import {Input, Button, Checkbox, message,Steps} from "antd";


import {withRouter}  from 'react-router-dom'
import {connect} from 'react-redux'
import MyFooter from "./components/footer/myFooter";
import http from './common/http'
import {changeLoginStatus, changeUser, insertTag} from "./store/action";

const { Step } = Steps;
const {Password} = Input;
class Login extends React.Component{

    state = {
        formType:0,                 //表单的类型。0：用户名登录  || 1：注册  || 2：手机登录 || 3：修改密码
        loginLoading:false,         //登录按钮loading
        username:'',                //用户名
        password:'',                //密码
        phoneNum:'',                //手机号
        phoneCode:'',               //手机验证码
        imgSrc:'',                  //头像
        loginWrong:false,           //是否登录失败
        isAutoLogin:false,          //是否自动登录

    }

    //页面加载完成后，将登录状态置为1，即“正在登录”
    componentDidMount() {
        changeLoginStatus(1);
        // this.isHavenAuthenticated();
    }

    //页面销毁前，如果登录状态仍为“正在登录”，则置为“未登录”
    componentWillUnmount() {
        const {loginStatus,changeLoginStatus} = this.props;
        if (loginStatus === 1){
            changeLoginStatus(0)
        }
    }

    //是否验证过了
    isHavenAuthenticated = ()=>{
        http.authenticatePost('getTicket').then(res=>{
            console.log(res)
            if (res.data.status === 200){
                http.get('login',{
                    ticket:res.data.data
                }).then(loginRes=>{
                    console.log(loginRes)
                    const {history} = this.props
                    this.setState({
                        loginLoading:false
                    });
                    // let {avatar,userId,userName} = loginRes.data.data;
                    // changeUser({avatar,userId,userName});            //记录用户信息
                    changeLoginStatus(2);           //修改登录状态为“登录成功”
                    message.success('登录成功！');               //用户反馈
                    sessionStorage.setItem('haveLogin','true');             //sessionStorage里存储“已经登录过了”
                    history.push('/')        //最后把页面定向到主页
                })
            }else {
                return null
            }
        })
    }

    //登录
    login = ()=>{
        const {changeUser,changeLoginStatus,history} = this.props;
        const {username,password} = this.state
        this.setState({
            loginLoading:true
        });
        http.authenticatePost('login',{
            userName:username,
            password:password
        }).then(res=>{
            if (res.data.status === 200){
                http.get('login',{
                    ticket:res.data.data
                }).then(loginRes=>{
                    this.setState({
                        loginLoading:false
                    });
                    let {avatar,userId,userName} = loginRes.data.data;
                    changeUser({avatar,userId,userName});            //记录用户信息
                    changeLoginStatus(2);           //修改登录状态为“登录成功”
                    message.success('登录成功！');               //用户反馈
                    sessionStorage.setItem('haveLogin','true');             //sessionStorage里存储“已经登录过了”
                    history.push('/')        //最后把页面定向到主页
                })
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

    register = ()=>{
        //QQ或者邮箱
        const {username,password} = this.state
        const {history} = this.props
        http.authenticatePost('logon',{
            userName:username,
            password,
        }).then(res=>{
            console.log(res)
            if (res.data.status === 200){
                this.login()
            }else {
                this.setState({
                    loginLoading:false,
                    loginWrong:true,
                    username:'',
                    password:''
                })
            }
        })

    }

    phoneLogin = ()=>{

    }

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

    changeFormType = (e)=>{
        const {formtype} = e.target.dataset
        this.setState({
            formType:+formtype,
            loginLoading:false,         //登录按钮loading
            username:'',                //用户名
            password:'',                //密码
            phoneNum:'',                //手机号
            phoneCode:'',               //手机验证码
            imgSrc:'',                  //头像
            loginWrong:false,           //是否登录失败
        })
    }

    handlePressEnter = ()=>{
        const {formType} = this.state;
        switch (formType) {
            case 0:this.login();break;
            case 1:this.register();break;
            case 2:this.phoneLogin();break;
        }
    }

    clickUpload = ()=>{
        document.getElementById('registerUploadLocalImg').click();
    }

    uploadAvatar = ()=>{
        let that = this;
        let file = document.getElementById('registerUploadLocalImg').files[0];

        if (!file || !window.FileReader) { // 看支持不支持FileReader
            message.warn('您的浏览器不支持FileReader本地上传');
            return
        }
        if (/^image/.test(file.type)) {
            let formData=new FormData();
            formData.append('file',file)
            http.updatePost('uploadFile',formData).then(res=>{
                this.setState({
                    imgSrc:res.data.data
                })
            })
        }
    }


    formContent = ()=>{
        const {formType,isLogin,loginWrong,password,username,phoneNum,phoneCode,isAutoLogin,loginLoading,imgSrc} = this.state;
        const Username = <Input className={'input_wp'}
                                data-statename={'username'}
                                size={'large'}
                                placeholder="用户名"
                                value={username}
                                name={'username'}
                                onChange={this.changeText}
                                onFocus={this.cancelLoginWrong}
                                onPressEnter={this.handlePressEnter}
                                prefix={<i className={'iconfont iconloginusername inputIcon'}/>}/>;
        const Password = <Input className={'input_wp'}
                                data-statename={'password'}
                                size={'large'}
                                placeholder="密码"
                                name={'password'}
                                value={password}
                                onChange={this.changeText}
                                onFocus={this.cancelLoginWrong}
                                onPressEnter={this.handlePressEnter}
                                prefix={<i className={'iconfont iconloginpassword inputIcon'}/>}/>;
        const PhoneNum = <Input className={'input_wp'}
                             data-statename={'phoneNum'}
                             size={'large'}
                             placeholder="手机号"
                             value={phoneNum}
                             name={'phoneNum'}
                             onChange={this.changeText}
                             onFocus={this.cancelLoginWrong}
                             prefix={<i className={'iconfont iconiphone7 inputIcon'} style={{fontSize:'20px'}}/>}/>;
        const PhoneCode = <div className={'spaceBetween'} style={{margin:'0'}}>
                                <Input className={'input_wp'}
                                       data-statename={'phoneCode'}
                                       size={'large'}
                                       placeholder="手机验证码"
                                       value={phoneCode}
                                       name={'phoneCode'}
                                       onChange={this.changeText}
                                       onFocus={this.cancelLoginWrong}
                                       onPressEnter={this.handlePressEnter}/>
                                <Button size={'large'} style={{marginLeft:20}}>获取验证码</Button>
                          </div>;


        //0：用户名登录  || 1：注册  || 2：手机登录 || 3：修改密码
        switch (formType) {
            case 0:return (
                    <>
                        {Username}
                        {Password}
                        <div className={'spaceBetween'}>
                            <div className={'autoLogin'}>
                                <Checkbox checked={isAutoLogin} onChange={this.toggleIsAutoLogin}/>
                                <span onClick={this.toggleIsAutoLogin}>自动登录</span>
                            </div>
                            <a href={'#'} data-formtype={3} onClick={this.changeFormType}>忘记密码</a>
                        </div>
                        <Button type={'primary'} size={'large'} block loading={loginLoading} onClick={this.login}>登录</Button>
                        <div className={'spaceBetween'}>
                            <div className={'otherWay'}>
                                其他登录方式：
                                <i className={'iconfont iconiphone7'} data-formtype={2} onClick={this.changeFormType} title={'手机号登录'}/>
                                <i className={'iconfont iconqq'} title={'QQ登录'}/>
                            </div>
                            <a href={'#'} data-formtype={1} onClick={this.changeFormType}>新用户注册</a>
                        </div>
                    </>);
            case 1:return (
                <>
                    <div className={'avatar_wp'} onClick={this.clickUpload}>
                        <input type="file" hidden onChange={this.uploadAvatar} id={'registerUploadLocalImg'} accept="image/*"/>
                        {
                            imgSrc === ''
                            ?<i className={'iconfont iconadd'}/>
                            :<img src={imgSrc} alt={username}/>
                        }
                    </div>
                    {Username}
                    <span className={'tips'}>
                        <i className={'iconfont iconwarn'}/>
                        2到10位，仅支持中文或英文字符
                    </span>
                    {Password}
                    <span className={'tips'}>
                        <i className={'iconfont iconwarn'}/>
                        6到16位，方便和安全要同时考虑呀
                    </span>
                    {PhoneNum}
                    {PhoneCode}
                    <div className={'spaceBetween'}>
                        <Button type={'primary'} style={{width:120}} size={'large'} onClick={this.register}>注册</Button>
                        <a href={"#"} data-formtype={0} onClick={this.changeFormType}>登录</a>
                    </div>
                </>
            );
            case 2:return (
                    <>
                        {PhoneNum}
                        {PhoneCode}
                        <Button type={'primary'} size={'large'} block loading={loginLoading} style={{marginTop:'10px'}} onClick={this.login}>登录</Button>
                        <div className={'spaceBetween'}>
                            <div className={'otherWay'}>
                                其他登录方式：
                                <i className={'iconfont iconloginusername'} style={{fontSize:18}} data-formtype={0} onClick={this.changeFormType} title={'用户名登录'}/>
                                <i className={'iconfont iconqq'} title={'QQ登录'}/>
                            </div>
                            <a href={'#'} data-formtype={1} onClick={this.changeFormType}>新用户注册</a>
                        </div>
                    </>)
            case 3:return (
                <>
                    {PhoneNum}
                    {PhoneCode}
                    {Password}
                    <span className={'tips'}>
                        <i className={'iconfont iconwarn'}/>
                        新密码，6到16位，这次要记住啊
                    </span>
                    <div className={'spaceBetween'}>
                        <Button type={'primary'} style={{width:120}} size={'large'} onClick={this.register}>确定</Button>
                        <a href={"#"} style={{color:'red'}} data-formtype={0} onClick={this.changeFormType}>取消修改</a>
                    </div>
                </>
            )

        }
    };

    render() {
        const {history} = this.props;
        const {formType,isLogin,loginWrong,password,username,isAutoLogin,loginLoading,phoneNum} = this.state;
        return (
            <div className={'login'}>
                <div className={`login_wp ${loginWrong?'wrong':''}`}>
                    {this.formContent()}
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
