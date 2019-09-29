
import {combineReducers} from "redux";
import defaultState from './state'


function tagList(state = defaultState.tagList,action) {
    switch (action.type) {
        case 'add_tag':
            let arr = Object.assign([],state);
            //对每一层递归，根据key值找到目标对象
            const fn = function (obj) {
                if (obj.key === action.dom.pid){
                    return obj;
                } else {
                    for (let i=0;i<obj.children.length;i++){
                        if (action.dom.pid.indexOf(obj.children[i].key)===0){
                            return fn(obj.children[i]);
                        }
                    }
                }

            };
            let targetObj = fn(arr);
            targetObj.children.push(action.dom);
            return arr;
        default:return state;
    }

}

function selectedTag(state = defaultState.selectedTag,action) {
    switch (action.type) {
        case 'change_currenttag':{
            //对每一层递归，根据key值找到目标对象
            const fn = function (obj) {
                if (obj.key === action.key){
                    return obj;
                } else {
                    for (let i=0;i<obj.children.length;i++){
                        if (action.key.indexOf(obj.children[i].key)===0){
                            return fn(obj.children[i]);
                        }
                    }
                }

            };
            let targetObj = fn(defaultState.tagList);           //这个就是目标对象

            let willCreateKey = '';                 //即将新建的元素的key值
            if (targetObj.children){
                let arr = [];
                for (let j=0;j<targetObj.children.length;j++){
                    let x = targetObj.children[j].key.split('-');
                    arr.push(x[x.length-1])
                }
                willCreateKey = `${targetObj.key}-${Math.max(...arr)+1}`;
            } else {
                willCreateKey = `${targetObj.key}-0`
            }
            targetObj.willCreateKey = willCreateKey;
            return targetObj;
        }
        default:return state
    }
}

export default combineReducers({
    tagList,
    selectedTag
});
