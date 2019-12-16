import React from 'react'
import {Input,Divider,Tooltip} from "antd";
import store from '../../../../store'
import '../css/viewport.less'
import {updateSetting} from "../../../../store/action";
class Viewport extends React.Component{

    constructor(props){
        super(props);
        this.state = Object.assign({},store.getState(),{
            isChecked:true,
            viewport:{
                diviceType:'默认',
                diviceDirectionL:'横向',
                size:'60vw * 60vh （分别为设备宽度和高度的60%）',
                ratio:'/'
            },
            activeDiviceIndex:0,
            isEditing:false,
            editWidth:'1024',
            editHeight:'768',
            diviceList:[
                {
                    diviceName: '默认',      //设备名
                    isHorizontal: false,     //是否水平放置
                    width:'60vw',
                    height:'60vh',
                    icon:'icondefaultdivice'
                },
                {
                    diviceName: 'iP 5/SE',
                    isHorizontal: false,
                    width:'320px',
                    height:'568px',
                    icon:'iconiphone5'
                },
                {
                    diviceName: 'iP 6/7/8',
                    isHorizontal: false,
                    width:'375px',
                    height:'667px',
                    icon:'iconiphone6'
                },
                {
                    diviceName: 'iP X',
                    isHorizontal: false,
                    width:'375px',
                    height:'812px',
                    icon:'iconiphone7'
                },
                {
                    diviceName: 'iPad',
                    isHorizontal: false,
                    width:'768px',
                    height:'1024px',
                    icon:'iconipad'
                },
                {
                    diviceName: 'PC-S',
                    isHorizontal: false,
                    width:'1280px',
                    height:'1024px',
                    icon:'iconpc1'
                },
                {
                    diviceName: 'PC-M',
                    isHorizontal: false,
                    width:'1366px',
                    height:'768px',
                    icon:'iconpc2'
                },
                {
                    diviceName: 'PC-L',
                    isHorizontal: false,
                    width:'1980px',
                    height:'1080px',
                    icon:'iconpc3'
                }
            ]
        });
        store.subscribe(this.listener);
    }

    listener = () => {
        let newState = store.getState();
        this.setState(newState);
    };

    changeDevice = check =>{
        this.setState({
            isChecked:check
        })
    }

    changeSize = (divice,index)=>{
        if (index !== -1 && this.state.isEditing){
            this.setState({
                isEditing:false,
                activeDiviceIndex:index
            },()=>{
                updateSetting({
                    prop:'width',
                    value:divice.width
                });
                updateSetting({
                    prop:'height',
                    value:divice.height
                });
            })
        }

        if (this.state.activeDiviceIndex === index && index !== 0 && index !== -1){


            let diviceList = this.state.diviceList.slice();
            diviceList[index].isHorizontal = !diviceList[index].isHorizontal;
            let width = diviceList[index].width;
            let height = diviceList[index].height;
            diviceList[index].width = height;
            diviceList[index].height = width;
            this.setState({diviceList});
            this.changeViewPort(this.state.diviceList[this.state.activeDiviceIndex]);
            updateSetting({
                prop:'width',
                value:divice.width
            });
            updateSetting({
                prop:'height',
                value:divice.height
            });
        } else {
            this.setState({
                activeDiviceIndex:index
            });
            if (index === -1 ){
            //     this.changeViewPort(this.state.diviceList[this.state.activeDiviceIndex]);
            // } else {
                const gcd = function(m,n){
                    if (n === 0){
                        return m;
                    } else {
                        return gcd(n,m%n);
                    }
                };
                let max = gcd(parseInt(this.state.editWidth),parseInt(this.state.editHeight));
                this.setState({
                    viewport:{
                        diviceType:'自定义',
                        diviceDirectionL:'自定义',
                        size:`${this.state.editWidth} * ${this.state.editHeight}`,
                        ratio:`${parseInt(this.state.editWidth)/max} * ${parseInt(this.state.editHeight)/max}`
                    },
                })
            }

            updateSetting({
                prop:'width',
                value:divice.width
            });
            updateSetting({
                prop:'height',
                value:divice.height
            });
        }

    }

    changeViewPort = (divice)=>{
        let size = '';
        if (divice.diviceName === '默认'){
            size = '60vw * 60vh （分别为设备宽度和高度的60%）'
        } else {
            size = `${divice.width} * ${divice.height}`
        }
        let ratio = '';
        if (divice.diviceName === '默认'){
            ratio = '/'
        } else {
            const gcd = function(m,n){
                if (n === 0){
                    return m;
                } else {
                    return gcd(n,m%n);
                }
            };
            let max = gcd(parseInt(divice.width),parseInt(divice.height));
            ratio = `${parseInt(divice.width)/max} * ${parseInt(divice.height)/max}`
        }
        let viewport = {
            diviceType:divice.diviceName,
            diviceDirectionL:divice.isHorizontal ? '横向' : '纵向',
            size,
            ratio
        }
        this.setState({viewport})
    }

    getViewport = ()=>{
        if (this.state.activeDiviceIndex>-1){
            this.changeViewPort(this.state.diviceList[this.state.activeDiviceIndex])
        } else {
            const gcd = function(m,n){
                if (n === 0){
                    return m;
                } else {
                    return gcd(n,m%n);
                }
            };
            let max = gcd(parseInt(this.state.editWidth),parseInt(this.state.editHeight));
            this.setState({
                viewport:{
                    diviceType:'自定义',
                    diviceDirectionL:'自定义',
                    size:`${this.state.editWidth} * ${this.state.editHeight}`,
                    ratio:`${parseInt(this.state.editWidth)/max} * ${parseInt(this.state.editHeight)/max}`
                },
            })
        }

    }

    startCustomer = ()=>{
        const gcd = function(m,n){
            if (n === 0){
                return m;
            } else {
                return gcd(n,m%n);
            }
        };
        let max = gcd(parseInt(this.state.editWidth),parseInt(this.state.editHeight));
        this.setState({
            isEditing:true,
            viewport:{
                diviceType:'自定义',
                diviceDirectionL:'自定义',
                size:`${this.state.editWidth} * ${this.state.editHeight}`,
                ratio:`${parseInt(this.state.editWidth)/max} * ${parseInt(this.state.editHeight)/max}`
            },
            activeDiviceIndex:-1
        })
    }

    render() {
        return (
            <div className={'viewport'}>
                <div className={'full'} onClick={()=>{
                    updateSetting({
                        prop:'width',
                        value:'full'
                    });
                    updateSetting({
                        prop:'height',
                        value:'full'
                    });
                }}>
                    <i className={'iconfont iconfullscreen'}/>
                    <span>全屏显示</span>
                </div>
                <Divider type={'vertical'} style={{height:'50px',margin:'0 10px'}}/>
                <div className='deviceChoose'>
                    {
                        this.state.diviceList.map((item,index)=>{
                            return (
                                <div className={`devices ${index === this.state.activeDiviceIndex ? 'active' : ''}`}
                                     onMouseEnter={()=>this.changeViewPort(item)}
                                     onMouseLeave={()=>this.getViewport()}
                                     onClick={()=>this.changeSize(item,index)}
                                >
                                    <i className={`iconfont ${item.icon}`} style={item.isHorizontal?{transform:'rotate(-90deg)'}:{}}/>
                                    <span>{item.diviceName}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`customize ${this.state.activeDiviceIndex===-1?'active':''}`} onClick={()=>this.setState({activeDiviceIndex:-1},()=>this.changeSize({width:this.state.editWidth,height:this.state.editHeight},-1))}>
                    <div className={'customizeTitle'}>
                        <span>自定义：</span>
                        {
                            this.state.isEditing
                                ? <i className={'iconfont iconcurrent'} title={'应用'} onClick={()=>this.setState({isEditing:false},()=>this.changeSize({width:this.state.editWidth,height:this.state.editHeight},-1))}/>
                                : <i className={'iconfont iconrename'} title={'编辑'} onClick={()=>this.startCustomer()}/>
                        }
                    </div>
                    {
                        this.state.isEditing
                            ?
                            <div className={'customizeContent'}>
                                <input type={'text'} maxLength={4} value={this.state.editWidth} onChange={(e)=>this.setState({editWidth:e.target.value},()=>this.startCustomer())}/>
                                <span style={{margin:'0px 5px',fontSize:'20px'}}>*</span>
                                <input type={'text'} maxLength={4} value={this.state.editHeight} onChange={(e)=>this.setState({editHeight:e.target.value},()=>this.startCustomer())}/>
                            </div>
                            :
                            <span className={'customizeContent'}>{this.state.editWidth} * {this.state.editHeight}</span>
                    }
                </div>
                <Divider type={'vertical'} style={{height:'50px',margin:'0 10px'}}/>
                <div className={'info'}>
                    <p>
                        <span>
                            <span>设备类型：</span><code>{this.state.viewport.diviceType}</code>
                        </span>
                        <span>
                            <span>方向：</span><code>{this.state.viewport.diviceDirectionL}</code>
                        </span>
                    </p>
                    <p>
                        <span>
                           <span>分辨率：</span><code>{this.state.viewport.size}</code>
                        </span>
                        <span>
                            <span>宽高比：</span><code>{this.state.viewport.ratio}</code>
                        </span>
                    </p>
                    <Tooltip title={'展示区的宽度和高度是此处分辨率的60%'}>
                        <i className={'iconfont iconhelp'}/>
                    </Tooltip>
                </div>

            </div>


        )
    }
}

export default Viewport
