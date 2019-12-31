import {changeHoverStyle, changeNocssStyle} from "../store/action";
import store from '../store'

/**
 * redux的reducer中频繁使用的方法，通过key值找到虚拟dom树中的对象
 *
 * @param {String} key 目标对象的key值
 * @param {Object} obj 寻找的目标范围，初始值通常是state中的tagList的浅拷贝
 * */
export function getObjByKeyFromTagList(key,obj) {
    if (obj.key === key){
        return obj;
    } else {
        for (let i=0; i<obj.children.length;i++){
            if (key.indexOf(obj.children[i].key) === 0){
                return getObjByKeyFromTagList(key,obj.children[i]);
            }
        }
    }
}

/**
 * 合并内联样式和类中的样式
 *
 * @param {Object} originObj 当前操作的对象
 * @param {String} styleType 需要进行合并的style的类型，一般有四种。'viewStyle'、'trueStyle'、'hoverTrueStyle'、'hoverViewStyle'
 *
 * @return {Object} 返回一个合并后的css列表
 * */
export function getComputedCss(originObj,styleType) {
    let classStyle = {};
    let list = store.getState().classList.map(item=>item.className);
    if (JSON.stringify(originObj)!=='{}'){
        if (originObj.props.className){
            originObj.props.className.forEach((item)=>{
                if (list.includes(item)){
                    classStyle = Object.assign({},classStyle,store.getState().classList[list.indexOf(item)][styleType]);
                }
            });
        }


    }
    return Object.assign({},classStyle,originObj[styleType]);
}


/**
 *
 * nocss中修改样式的统一方法。
 * 规定：extra的第一个参数必须为空格分开的第几个值
 *
 * @param {String} stateName 用于辨别是标准css还是hover的css
 * @param {String} prop 要修改的属性名
 * @param {String} value 提交修改的属性值
 * @param {Array} extra 额外参数。
 *                      第一个参数必须为空格分开的第几个值，如border:solid 2px black;之类。
 *                      第二个参数一般为box-shadow等可以有好几个以分号分开的值的位置。
 *
 * */
export function changeProp (stateName,prop,value,...extra){
    let patt = new RegExp(`(?<=(.+\\s{1}){${extra[0]}})\\S+(?=\\s{1})`);           //第几个空格之后的【空格前的值】，会用到很多次
    switch (prop) {
        case 'color':
        case 'backgroundColor':
            switch (stateName) {
                case 'nocssStyle':{
                    changeNocssStyle({
                        prop,
                        value:colorRgba(value.color,value.alpha)
                    });break;
                }
                case 'hoverStyle':{
                    changeHoverStyle({
                        prop,
                        value:colorRgba(value.color,value.alpha)
                    });break;
                }
                default:return;
            }
            break;
        case 'fontSize':
            switch (stateName) {
                case 'nocssStyle':{
                    changeNocssStyle({
                        prop,
                        value:`${value}px`
                    });break;
                }
                case 'hoverStyle':{
                    changeHoverStyle({
                        prop,
                        value:`${value}px`
                    });break;
                }
                default:return;
            }
            break;
        case 'border':
        case 'padding':
        case 'borderRadius':
            switch (stateName) {
                case 'nocssStyle':{
                    let str = store.getState().nocssStyle[prop]+' ';
                    changeNocssStyle({
                        prop,
                        value:str.replace(patt,value).trim()
                    });
                    break;
                }
                case 'hoverStyle':{
                    let str = store.getState().hoverStyle[prop]+' ';
                    changeHoverStyle({
                        prop,
                        value:str.replace(patt,value).trim()
                    });
                    break;
                }
                default:return;
            }
            break;
        case 'boxShadow':
        case 'textShadow':

            switch (stateName) {
                case 'nocssStyle':{
                    let origin = store.getState().nocssStyle[prop].split(/(?<=rgba\(.*\)|#\w{6}),/g);
                    let temp = origin[extra[1]]+' ';
                    origin[extra[1]] = temp.replace(patt,value).trim();
                    changeNocssStyle({
                        prop,
                        value:origin.join(',')
                    });
                    break;
                }
                case 'hoverStyle':{
                    let origin = store.getState().hoverStyle[prop].split(/(?<=rgba\(.*\)|#\w{6}),/g);
                    let temp = origin[extra[1]]+' ';
                    origin[extra[1]] = temp.replace(patt,value).trim();
                    changeHoverStyle({
                        prop,
                        value:origin.join(',')
                    });
                    break;
                }
                default:return;
            }
            break;
        default:
            switch (stateName) {
                case 'nocssStyle':changeNocssStyle({prop,value});break;
                case 'hoverStyle':changeHoverStyle({prop,value});break;
                default:return;
            }
    }
}

/**
 * 16进制的颜色值转换成rgba
 * @param {String} color 16进制颜色值
 * @param {String} opacity 颜色的透明度
 *
 * @return {String} 返回一个rbga格式的颜色值，如果透明度为1，就不用转换
 *
 * */
export function colorRgba(color,opacity) {
    if (opacity !== 100){
        // 16进制颜色值的正则
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // 把颜色值变成小写
        color = color.toLowerCase();
        if (reg.test(color)) {
            // 如果只有三位的值，需变成六位，如：#fff => #ffffff
            if (color.length === 4) {
                let colorNew = "#";
                for (let i = 1; i < 4; i += 1) {
                    colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                }
                color = colorNew;
            }
            // 处理六位的颜色值，转为RGB
            let colorChange = [];
            for (let i = 1; i < 7; i += 2) {
                colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
            }
            return `rgba(${colorChange.join(',')},${opacity/100})`;
        } else {
            return color;
        }
    } else {
        return color;
    }
}

/**
 *  多个值合并的css属性的增加，如boxShadow、textShadow等
 *
 *  @param {String} stateName 用于辨别是标准css还是hover的css
 *  @param {String} prop 要操作的属性名
 * */
export function addProp(stateName,prop) {
    switch (prop) {
        case 'boxShadow':
            let boxShadowValue = store.getState()[stateName].boxShadow+',0px 0px 0px 0px #000000';
            switch (stateName) {
                case 'nocssStyle':
                    changeNocssStyle({
                        prop,
                        value:boxShadowValue
                    });break;
                case 'hoverStyle':
                    changeHoverStyle({
                        prop,
                        value:boxShadowValue
                    });break;
                default:return;
            }
            break;
        case 'textShadow':
            let textShadowValue = store.getState()[stateName].textShadow+',0px 0px 0px #000000';
            switch (stateName) {
                case 'nocssStyle':
                    changeNocssStyle({
                        prop,
                        value:textShadowValue
                    });break;
                case 'hoverStyle':
                    changeHoverStyle({
                        prop,
                        value:textShadowValue
                    });break;
                default:return;
            }
            break;
        default:return;
    }
}

/**
 *  多个值合并的css属性的删除，如boxShadow、textShadow等
 *
 *  @param {String} stateName 用于辨别是标准css还是hover的css
 *  @param {String} prop 要操作的属性名
 *  @param {Number} index 要删除的值的位置
 * */
export function deleteProp (stateName,prop,index){
    let value = store.getState()[stateName][prop];
    switch (prop) {
        case 'boxShadow':
        case 'textShadow':
            value = value.split(/(?<=rgba\(.*\)|#\w{6}),/g);
            value.splice(index,1);
            break;
        default:return;
    }
    switch (stateName) {
        case 'nocssStyle':
            changeNocssStyle({
                prop,
                value:value.join(',')
            });break;
        case 'hoverStyle':
            changeHoverStyle({
                prop,
                value:value.join(',')
            });break;
        default:return;
    }
}
