import React from 'react'

import './css/home.less'
import MyFooter from "./components/footer/myFooter";
import Swiper from 'swiper/js/swiper'
import 'swiper/css/swiper.css'

class Home extends React.Component{

    state = {
        mySwiper:null
    }

    componentDidMount() {
        let swiper = new Swiper('.swiper-container', {          //初始化Swiper
            height:'100%',
            direction: 'horizontal',//横向轮播
            loop: true,//无缝轮播
            parallax:true,
            speed:300,
            grabCursor : true,
            autoplay : {
                delay:3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {//左右分页
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
        this.setState({
            mySwiper:swiper
        })
    }

    componentWillUnmount() {
        const {mySwiper} = this.state;
        if (mySwiper !== null) { // 销毁swiper
            mySwiper.destroy()
        }
    }

    render() {
        return (
            <>
                <div className={'home_wp'}>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className={'describe_wp'}>
                                    <div>
                                        <h3 className={'describe'}>树状结构，随心操作元素</h3>
                                        <pre className={'describe_content'}>
                                            细致还原Dom树，像Word一样编辑您的元素
                                        </pre>
                                    </div>
                                    <img className={'screenShot'} src={require('./asset/mainBC_01.png')} alt={'树状图'}/>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className={'describe_wp'}>
                                    <img className={'screenShot'} src={require('./asset/mainBC_02.png')} alt={'动画编辑器'}/>
                                    <div>
                                        <h3 className={'describe'}>动画编辑</h3>
                                        <pre className={'describe_content'}>
                                            内置动画编辑器，玩转@keyframes
                                        </pre>
                                    </div>

                                </div>
                            </div>
                            <div className="swiper-slide">Slide 3</div>
                        </div>
                    </div>

                    <div className="swiper-button-prev"/>
                    <div className="swiper-button-next"/>
                    <div className="swiper-pagination"/>
                </div>

                <MyFooter/>
            </>
        )
    }
}

export default Home
