import React,{PureComponent} from 'react'
import ColorPicker from "rc-color-picker";
import {connect} from 'react-redux'
import {changeProp,colorRgba} from "../../../../common/units";
import {Select, Slider} from "antd";
const {Option} = Select;

class MyBorder extends PureComponent{

    changeBorderWidth = (e)=>{
        const {stateName} = this.props;
        changeProp(stateName,'border',e+'px',0);
    };

    changeBorderStyle = (e)=>{
        const {stateName} = this.props;
        changeProp(stateName,'border',e,1);
    };

    changeBorderColor = (color)=>{
        const {stateName} = this.props;
        changeProp(stateName,'border',colorRgba(color.color,color.alpha),2);
    };

    render() {
        const {stateName,nocssStyle,hoverStyle} = this.props;
        const {border} = stateName==='nocssStyle' ? nocssStyle : hoverStyle;

        return(
            <li className={'border'}>
                <span className={'operateTitle'}><i className={'iconfont iconnocssborder'}/>边框</span>
                <div className={'content'}>
                    <div className={'items'}>
                        <Slider style={{width:100}} min={0} max={20} onChange={this.changeBorderWidth} value={parseInt(border.split(' ')[0])}/><span className={'unit'}>{border.split(' ')[0]}</span>
                    </div>
                    <div className={'items flexStart'}>
                        <Select style={{width:150}} defaultValue={border.split(' ')[1]} onChange={this.changeBorderStyle}>
                            <Option className={'OptionItem'} value={'solid'}><i className={'iconfont iconsolid'}/>实线<span>solid</span></Option>
                            <Option className={'OptionItem'} value={'dashed'}><i className={'iconfont icondashed'}/>虚线<span>dashed</span></Option>
                            <Option className={'OptionItem'} value={'dotted'}><i className={'iconfont icondotted'}/>点状<span>dotted</span></Option>
                            <Option className={'OptionItem'} value={'double'}><i className={'iconfont icondouble'}/>双实线<span>double</span></Option>
                            <Option className={'OptionItem'} value={'ridge'}><i className={'iconfont iconridge'}/>凸起<span>ridge</span></Option>
                            <Option className={'OptionItem'} value={'groove'}><i className={'iconfont icongroove'}/>凹槽<span>groove</span></Option>
                            <Option className={'OptionItem'} value={'inset'}><i className={'iconfont iconinset'}/>内阴影<span>inset</span></Option>
                            <Option className={'OptionItem'} value={'outset'}><i className={'iconfont iconoutset'}/>外阴影<span>outset</span></Option>
                        </Select>
                    </div>
                    <div className={'items'}>
                        <ColorPicker onChange={this.changeBorderColor} defaultColor={border.split(' ')[2]} defaultAlpha={new RegExp('(?<=\\()\\S+(?=\\))','g').exec(border.split(' ')[2])?Number(new RegExp('(?<=\\()\\S+(?=\\))','g').exec(border.split(' ')[2])[0].split(',')[3])*100:100}>
                            <div className={'colorpicker'}>
                                <span className={'currentColor'} style={{backgroundColor:border.split(' ')[2]}}/>
                                <span className={'currentColorText'}>{border.split(' ')[2]}</span>
                            </div>
                        </ColorPicker>
                    </div>
                </div>
            </li>
        )
    }
}

function mapStateToProps(state) {
    const {nocssStyle,hoverStyle} = state;
    return {nocssStyle,hoverStyle}
}

export default connect(mapStateToProps)(MyBorder)
