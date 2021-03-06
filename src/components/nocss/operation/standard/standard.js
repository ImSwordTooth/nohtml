import React,{PureComponent} from 'react'
import 'rc-color-picker/assets/index.css';
import './standard.less'
import MyColor from "../props/myColor";
import MyBackgroundColor from "../props/myBackgroundColor";
import MyFontSize from "../props/myFontSize";
import MyFontStyle from "../props/myFontStyle";
import MyBorder from "../props/myBorder";
import MyPadding from "../props/myPadding";
import MyBoxShadow from "../props/myBoxShadow";
import MyTextShadow from "../props/myTextShadow";
import MyTransform from "../props/myTransform";
import MyBorderRadius from "../props/myBorderRadius";

class Standard extends PureComponent{

    render() {
        return (
            <div>
                <ul className={'operationUl'}>
                    {/*颜色*/}
                    <MyColor stateName={'nocssStyle'}/>
                    {/*背景颜色*/}
                    <MyBackgroundColor stateName={'nocssStyle'}/>
                    {/*字体大小*/}
                    <MyFontSize stateName={'nocssStyle'}/>
                    {/*字型*/}
                    <MyFontStyle stateName={'nocssStyle'}/>
                    {/*边框*/}
                    <MyBorder stateName={'nocssStyle'}/>
                    {/*内边距*/}
                    <MyPadding stateName={'nocssStyle'}/>
                    {/*盒子阴影*/}
                    <MyBoxShadow stateName={'nocssStyle'}/>
                    {/*字体阴影*/}
                    <MyTextShadow stateName={'nocssStyle'}/>
                    {/*变形*/}
                    <MyTransform stateName={'nocssStyle'}/>
                    {/*轮廓线*/}
                    <li id={'outline'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnetworkimg'}/>背景</span>
                        <div className={'content'}>

                        </div>
                    </li>
                    {/*轮廓线*/}
                    <MyBorderRadius stateName={'nocssStyle'}/>
                    {/*轮廓线*/}
                    <li id={'outline'}>
                        <span className={'operateTitle'}><i className={'iconfont iconnocssoutline'}/>滤镜</span>
                        <div className={'content'}>

                        </div>
                    </li>
                </ul>
            </div>
        )
    }

}

export default Standard;
