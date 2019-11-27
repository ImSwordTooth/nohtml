import {changeHoverStyle, changeNocssStyle} from "../../../../store/action";

import store from '../../../../store'




export function changeProp (stateName,prop,value,...extra){
    //规定，extra的第一个参数必须为空格分开的第几个值
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
                case 'hoverStyle':changeHoverStyle({prop,value});break
            }
    }
}

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
            var colorChange = [];
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
    }
}

export function deleteProp (stateName,prop,index){
    let value = store.getState()[stateName][prop];
    switch (prop) {
        case 'boxShadow':
        case 'textShadow':
            value = value.split(/(?<=rgba\(.*\)|#\w{6}),/g);
            value.splice(index,1);
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

//普通css代码的value直接是个字符串，而hover的还带有一个对象，在此区别一下
export function getProp(stateName,prop) {

    switch (stateName) {
        case 'standard':{
            return store.getState().nocssStyle[prop];
        }
        case 'hover':{
            console.log(prop)
            return store.getState().hoverStyle[prop].value;
        }
        default:return;
    }
}
