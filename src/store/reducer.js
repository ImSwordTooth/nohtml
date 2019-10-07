
import {combineReducers} from "redux";
import defaultState from './state'


function tagList(state = defaultState.tagList,action) {
    switch (action.type) {
        case 'add_tag':
            let addTagArr = Object.assign([],state);
            //对每一层递归，根据key值找到目标对象
            const getTargetObj = function (obj) {
                if (obj.key === action.dom.pid){
                    obj.children.push(action.dom);
                } else {
                    for (let i=0;i<obj.children.length;i++){
                        if (action.dom.pid.indexOf(obj.children[i].key)===0){
                            return getTargetObj(obj.children[i]);
                        }
                    }
                }

            };
            getTargetObj(addTagArr);
            // targetObj.children.push(action.dom);
            return addTagArr;
        case 'update_tag':
            let updateTagArr = Object.assign([],state);
            const fn = function (obj) {
                if (obj.key === action.key){

                    if (action.prop !== 'style'){
                        obj[action.prop] = action.value;
                    } else {
                        obj[action.prop][action.innerProp] = action.value;
                        // if (action.innerProp !== 'style'){
                        //     obj[action.prop][action.innerProp] = action.value;
                        // } else {
                        //     obj.props.style = Object.assign({},obj.props.style,{
                        //         [action.innerProp]:action.value
                        //     });
                        // }

                    }

                } else {
                    for (let i=0;i<obj.children.length;i++){
                        if (action.key.indexOf(obj.children[i].key)===0){
                            return fn(obj.children[i]);
                        }
                    }
                }
            };
            fn(updateTagArr);
            return updateTagArr;
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

            if (action.key === state.key){
                return state;
            } else {
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
        }
        default:return state
    }
}

function showDrawer(state = defaultState.showDrawer,action) {
    switch (action.type) {
        case 'change_drawer':return action.status;
        default:return state;
    }
}

function hoveredTagKey(state = defaultState.hoveredTagKey,action) {
    switch (action.type) {
        case 'change_hoveredTagKey':return action.key;
        default:return state;
    }
}

export default combineReducers({
    tagList,
    selectedTag,
    showDrawer,
    hoveredTagKey
});
