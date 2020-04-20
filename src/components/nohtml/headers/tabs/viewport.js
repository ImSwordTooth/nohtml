import React,{PureComponent} from 'react'
import {connect} from 'react-redux'
import {Divider,Tooltip} from "antd";
import '../css/viewport.less'
import {updateSetting} from "../../../../store/action";
import {gcd} from '../../../../common/units'
class Viewport extends PureComponent{

    state = {
        isChecked:true,
        viewport:{
            deviceType:'默认',
            deviceDirectionL:'横向',
            size:'60vw * 60vh （分别为设备宽度和高度的60%）',
            ratio:'/'
        },
        activeDeviceIndex:0,
        isEditing:false,
        editWidth:'1024',
        editHeight:'768',
        deviceList:[
            {
                deviceName: '默认',      //设备名
                isHorizontal: false,     //是否水平放置
                width:'60vw',
                height:'60vh',
                icon:'icondefaultdevice'
            },
            {
                deviceName: 'iP 5/SE',
                isHorizontal: false,
                width:'320px',
                height:'568px',
                icon:'iconiphone5'
            },
            {
                deviceName: 'iP 6/7/8',
                isHorizontal: false,
                width:'375px',
                height:'667px',
                icon:'iconiphone6'
            },
            {
                deviceName: 'iP X',
                isHorizontal: false,
                width:'375px',
                height:'812px',
                icon:'iconiphone7'
            },
            {
                deviceName: 'iPad',
                isHorizontal: false,
                width:'768px',
                height:'1024px',
                icon:'iconipad'
            },
            {
                deviceName: 'PC-S',
                isHorizontal: false,
                width:'1280px',
                height:'1024px',
                icon:'iconpc1'
            },
            {
                deviceName: 'PC-M',
                isHorizontal: false,
                width:'1366px',
                height:'768px',
                icon:'iconpc2'
            },
            {
                deviceName: 'PC-L',
                isHorizontal: false,
                width:'1980px',
                height:'1080px',
                icon:'iconpc3'
            }
        ]
    }

    changeSize = (device,index)=>{
        const {isEditing,activeDeviceIndex,editWidth,editHeight,deviceList} = this.state;
        const {updateSetting} = this.props
        if (index !== -1 && isEditing){
            this.setState({
                isEditing:false,
                activeDeviceIndex:index
            },()=>{
                updateSetting({
                    prop:'width',
                    value:device.width
                });
                updateSetting({
                    prop:'height',
                    value:device.height
                });
            })
        }

        if (activeDeviceIndex === index && index !== 0 && index !== -1){
            let newDeviceList = deviceList.slice();
            newDeviceList[index].isHorizontal = !newDeviceList[index].isHorizontal;
            let width = newDeviceList[index].width;
            let height = newDeviceList[index].height;
            newDeviceList[index].width = height;
            newDeviceList[index].height = width;
            this.setState({deviceList:newDeviceList});
            this.changeViewPort(deviceList[activeDeviceIndex]);
            updateSetting({
                prop:'width',
                value:device.width
            });
            updateSetting({
                prop:'height',
                value:device.height
            });
        } else {
            this.setState({
                activeDeviceIndex:index
            });
            if (index === -1 ){
                const max = gcd(parseInt(editWidth),parseInt(editHeight));
                this.setState({
                    viewport:{
                        deviceType:'自定义',
                        deviceDirectionL:'自定义',
                        size:`${editWidth} * ${editHeight}`,
                        ratio:`${parseInt(editWidth)/max} * ${parseInt(editHeight)/max}`
                    },
                })
            }
            updateSetting({
                prop:'width',
                value:device.width
            });
            updateSetting({
                prop:'height',
                value:device.height
            });
        }
    };

    changeViewPort = (device)=>{
        let size = '';
        if (device.deviceName === '默认'){
            size = '60vw * 60vh （分别为设备宽度和高度的60%）'
        } else {
            size = `${device.width} * ${device.height}`
        }
        let ratio = '';
        if (device.deviceName === '默认'){
            ratio = '/'
        } else {
            const max = gcd(parseInt(device.width),parseInt(device.height));
            ratio = `${parseInt(device.width)/max} * ${parseInt(device.height)/max}`
        }
        let viewport = {
            deviceType:device.deviceName,
            deviceDirectionL:device.isHorizontal ? '横向' : '纵向',
            size,
            ratio
        };
        this.setState({viewport})
    };

    getViewport = ()=>{
        const {activeDeviceIndex,deviceList,editWidth,editHeight} = this.state;
        if (activeDeviceIndex>-1){
            this.changeViewPort(deviceList[activeDeviceIndex])
        } else {
            const max = gcd(parseInt(editWidth),parseInt(editHeight));
            this.setState({
                viewport:{
                    deviceType:'自定义',
                    deviceDirectionL:'自定义',
                    size:`${editWidth} * ${editHeight}`,
                    ratio:`${parseInt(editWidth)/max} * ${parseInt(editHeight)/max}`
                },
            })
        }
    };

    /**
     * 开启自定义宽高的界面
     * */
    startCustomer = ()=>{
        const {editWidth,editHeight} = this.state;
        const max = gcd(parseInt(editWidth),parseInt(editHeight));
        this.setState({
            isEditing:true,
            viewport:{
                deviceType:'自定义',
                deviceDirectionL:'自定义',
                size:`${editWidth} * ${editHeight}`,
                ratio:`${parseInt(editWidth)/max} * ${parseInt(editHeight)/max}`
            },
            activeDeviceIndex:-1
        })
    };

    /**
     * 全屏
     * */
    fullScreen = ()=>{
        const {updateSetting,setting} = this.props
        updateSetting({
            prop:'width',
            value:'full'
        });
        updateSetting({
            prop:'height',
            value:'full'
        });

        let timeout = setTimeout(()=>{
            if (setting.width === 'full'){
                let element = document.getElementById('0');
                let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
                if (requestMethod) {
                    requestMethod.call(element);
                }
            }
            clearTimeout(timeout);
        },0)
    };

    render() {
        const {deviceList,viewport,activeDeviceIndex,editWidth,editHeight,isEditing} = this.state;

        return (
            <div className={'viewport'}>
                <div className={'full'} onClick={this.fullScreen}>
                    <i className={'iconfont iconfullscreen'}/>
                    <span>全屏显示</span>
                </div>
                <Divider type={'vertical'} style={{height:'50px',margin:'0 10px'}}/>
                <div className='deviceChoose'>
                    {
                        deviceList.map((item,index)=>{
                            return (
                                <div className={`devices ${index === activeDeviceIndex ? 'active' : ''}`}
                                     onMouseEnter={()=>this.changeViewPort(item)}
                                     onMouseLeave={this.getViewport}
                                     onClick={()=>this.changeSize(item,index)}
                                >
                                    <i className={`iconfont ${item.icon}`} style={item.isHorizontal?{transform:'rotate(-90deg)'}:{}}/>
                                    <span>{item.deviceName}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`customize ${activeDeviceIndex===-1?'active':''}`} onClick={()=>this.setState({activeDeviceIndex:-1},()=>this.changeSize({width:editWidth,height:editHeight},-1))}>
                    <div className={'customizeTitle'}>
                        <span>自定义：</span>
                        {
                            isEditing
                                ? <i className={'iconfont iconcurrent'} title={'应用'} onClick={()=>this.setState({isEditing:false},()=>this.changeSize({width:editWidth,height:editHeight},-1))}/>
                                : <i className={'iconfont iconrename'} title={'编辑'} onClick={this.startCustomer}/>
                        }
                    </div>
                    {
                        isEditing
                            ?
                            <div className={'customizeContent'}>
                                <input type={'text'} maxLength={4} value={editWidth} onChange={(e)=>this.setState({editWidth:e.target.value},this.startCustomer)}/>
                                <span style={{margin:'0px 5px',fontSize:'20px'}}>*</span>
                                <input type={'text'} maxLength={4} value={editHeight} onChange={(e)=>this.setState({editHeight:e.target.value},this.startCustomer)}/>
                            </div>
                            :
                            <span className={'customizeContent'}>{editWidth} * {editHeight}</span>
                    }
                </div>
                <Divider type={'vertical'} style={{height:'50px',margin:'0 10px'}}/>
                <div className={'info'}>
                    <p>
                        <span>
                            <span>设备类型：</span><code>{viewport.deviceType}</code>
                        </span>
                        <span>
                            <span>方向：</span><code>{viewport.deviceDirectionL}</code>
                        </span>
                    </p>
                    <p>
                        <span>
                           <span>分辨率：</span><code>{viewport.size}</code>
                        </span>
                        <span>
                            <span>宽高比：</span><code>{viewport.ratio}</code>
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

function mapStateToProps(state) {
    const {setting} = state;
    return {setting}
}

function mapDispatchToProps() {
    return {
        updateSetting
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Viewport)
