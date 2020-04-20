import React from 'react'
import {changeProp} from "../../../../common/units";
import {Select, Slider, Tag} from "antd";
import {connect} from "react-redux";
const {Option} = Select;

class MyTransform extends React.Component{

    state = {
        isSelecting:true,
        selectedTransformProp:'',
        transformList:[
            {
                type:'',
                parameter:[]
            }
        ]
    }

    addTransformList = ()=>{
        let list = this.state.transformList;
        list.push({
            type:'',
            parameter:[]
        });
        this.setState({
            transformList:list
        });
        this.submit();
    };

    updateTransformType = (type,index)=>{
        const {transformList} = this.state;
        transformList[index].type = type;
        switch (type) {
            case 'translate':transformList[index].parameter = [{name:'x',value:'0px'},{name:'y',value:'0px'}];break;
            case 'scale':transformList[index].parameter = [{name:'倍率',value:'1.0'}];break;
            case 'rotate':transformList[index].parameter = [{name:'角度',value:'0deg'}];break;
            case 'skew':transformList[index].parameter = [{name:'x',value:'0deg'},{name:'y',value:'0deg'}]
        }
        this.setState({
            transformList
        });
        this.submit();
    };

    updateTransformValue = (value,index,param)=>{
        let list = this.state.transformList.slice();
        let parameter = list[index].parameter.slice();
        for (let i=0;i<parameter.length;i++) {
            if (parameter[i].name === param.name){
                if (/px/g.test(parameter[i].value)){
                    parameter[i].value = value + 'px';
                }else if (/deg/g.test(parameter[i].value)) {
                    parameter[i].value = value + 'deg';
                }else {
                    parameter[i].value = value;
                }

            }
        }
        list[index].parameter = parameter;
        this.setState({
            transformList:list
        });
        this.submit();
    };

    deleteTransform = (index)=>{
        let list = this.state.transformList;
        list.splice(index,1);
        if (list.length===0){
            this.addTransformList();
        } else {
            this.setState({
                transformList:list
            });
            this.submit();
        }
    };

    submit = ()=>{
        let value = '';
        let list = this.state.transformList;
        for (let i=0;i<list.length;i++){
            if (i>0){
                value += ' ';
            }
            switch (list[i].type) {
                case 'translate':value += `translate(${list[i].parameter[0].value},${list[i].parameter[1].value})`;break;
                case 'scale':value += `scale(${list[i].parameter[0].value})`;break;
                case 'rotate':value += `rotate(${list[i].parameter[0].value})`;break;
                case 'skew':value += `skew(${list[i].parameter[0].value},${list[i].parameter[1].value})`;break;
            }
        }
        changeProp(this.props.stateName,'transform',value);
    };

    //考虑到变形类型的不同，min、max、step都不同，因此要用函数生成
    getSlider = (type,param,index)=>{
        switch (type) {
            case 'translate':return (
                    <>
                        <Slider style={{width:100}} min={0} max={100} value={parseInt(param.value)} onChange={(e)=>this.updateTransformValue(e,index,param)}/>
                        <span className={'unit'}>{param.value}</span>
                    </>);
            case 'scale':return (
                <>
                    <Slider style={{width:100}} min={0.1} max={3.0} step={0.1} value={parseFloat(param.value)} onChange={(e)=>this.updateTransformValue(e,index,param)}/>
                    <span className={'unit'}>{param.value}</span>
                </>);
            case 'rotate':return(
                <>
                    <Slider style={{width:400}} min={-360} max={360} marks={{'0':'0','-90':'-90','90':'-90','-180':'-180','180':'180','-270':'-270','270':'270','-360':'-360','360':'360'}} value={parseInt(param.value)} onChange={(e)=>this.updateTransformValue(e,index,param)}/>
                    <span className={'unit fix'}>{param.value}</span>
                </>);
            case 'skew':return(
                <>
                    <Slider style={{width:200}} min={0} max={180} marks={{'0':'0','90':'90','180':'180'}} value={parseInt(param.value)} onChange={(e)=>this.updateTransformValue(e,index,param)}/>
                    <span className={'unit fix'}>{param.value}</span>
                </>);
        }
    };

    render() {
        const {transformList} = this.state;
        return(
            <li className={'transform multi'}>
                <span className={'operateTitle'}>
                    <i className={'iconfont iconnocsstransform'}/>
                    变形
                    {
                        transformList.every(item=>item.type!=='')?<i className={'iconfont iconadd add'} onClick={this.addTransformList}/>:<></>
                    }
                </span>

                <div>
                    {
                        transformList.map((item,index)=>{
                            return (
                                item.type===''
                                    ?
                                    <div className={'content'}>
                                        <i className={'iconfont icondelete delete'} onClick={()=>this.deleteTransform(index)}/>
                                        <Select style={{width:150}} defaultValue={'变形类型'} onChange={(e)=>this.updateTransformType(e,index)}>
                                            <Option className={'OptionItem'} value={'translate'}><i className={'iconfont icontranslate'}/>位移<span>translate</span></Option>
                                            <Option className={'OptionItem'} value={'scale'}><i className={'iconfont iconscale'}/>缩放<span>scale</span></Option>
                                            <Option className={'OptionItem'} value={'rotate'}><i className={'iconfont iconrotate'}/>旋转<span>rotate</span></Option>
                                            <Option className={'OptionItem'} value={'skew'}><i className={'iconfont iconskew'}/>倾斜<span>skew</span></Option>
                                        </Select>
                                    </div>
                                    :<div className={'content'}>
                                        <i className={'iconfont icondelete delete'} onClick={()=>this.deleteTransform(index)}/>
                                        <Tag className={'propTag'}>{item.type}</Tag>
                                        <div className={'content'} style={{left:'100px'}}>
                                            {item.parameter.map((p,i)=>{
                                                return (
                                                    <div className={'items'} key={i}>
                                                        <div className={'info'}>{p.name}：</div>
                                                        {this.getSlider(item.type,p,index)}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                            )
                        })
                    }
                </div>
            </li>
        )
    }
}

export default connect()(MyTransform)
