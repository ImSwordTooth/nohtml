import React from 'react'
import {Button, Modal} from "antd";

import './css/loginModal.less'

class LoginModal extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Modal width={800}
                visible={this.props.showLoginModal}
                    onCancel={this.props.cancel}
                   footer={null}
            >
                <div className={'loginContainer'}>
                    <h2 className={'title'}>xxx自动化构建工具</h2>
                    <div className={'form'}>
                        <div className={'item'}>
                            <span className={'item_name'}>用户名</span>
                            <label className={'input_wp'}>
                                <i className={'iconfont iconloginusername'}/>
                                <input type={'text'}/>
                            </label>
                        </div>
                        <div className={'item'}>
                            <span className={'item_name'}>密码</span>
                            <label className={'input_wp'}>
                                <i className={'iconfont iconloginpassword'}/>
                                <input type={'password'} placeholder={''}/>
                            </label>
                        </div>
                        <div className={'item oneEle'}>
                            {/*<span className={'item_name'} style={{marginLeft:'20px'}}>手机登录</span>*/}
                            <span className={'forget'}>忘记密码？</span>
                        </div>
                        <div className={'item oneEle'}>
                            <Button type={'primary'} size={'large'} className={'loginBtn'}>登录</Button>
                        </div>

                    </div>
                    <div className={'others'}>
                        <p className={'others_title'}>其他登录方式：</p>
                        <ul className={'others_list'}>
                            <li className={'phone'}>
                                <i className={'iconfont iconiphone7'}/>
                                <span>手机登录</span>
                            </li>
                            <li className={'qq'}>
                                <i className={'iconfont iconqq'}/>
                                <span>QQ登录</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </Modal>
        )
    }

}

export default LoginModal
