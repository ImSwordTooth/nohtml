
import {combineReducers} from "redux";
import defaultState from './state'
function tagList(state = defaultState.tagList,action) {
    switch (action.type) {
        case 'add_tag':
            let addTagArr = Object.assign([],state);
            //对每一层递归，根据key值找到目标对象
            const getCreateTargetObj = function (obj) {
                if (obj.key === action.dom.pid){
                    obj.children.push(action.dom);
                    getWillCreateKey(obj)
                    getWillInsertKey(obj,obj.key)
                } else {
                    for (let i=0;i<obj.children.length;i++){
                        if (action.dom.pid.indexOf(obj.children[i].key)===0){
                            return getCreateTargetObj(obj.children[i]);
                        }
                    }
                }

            };
            getCreateTargetObj(addTagArr);
            return addTagArr;
        case 'insert_tag':
            let insertTagArr = Object.assign([],state);
            //对每一层递归，根据key值找到目标对象
            const getInsertTargetObj = function (obj) {
                if (obj.key === action.dom.pid){
                    for (let j=0;j<obj.children.length;j++){
                        if (obj.children[j].key === action.selectedKey){
                            obj.children.splice(j+1,0,action.dom);
                            getWillCreateKey(obj.children[j]);
                            getWillInsertKey(obj.children[j],obj.children[j].key);
                            break;
                        }
                    }
                } else {
                    for (let i=0;i<obj.children.length;i++){
                        if (action.dom.pid.indexOf(obj.children[i].key)===0){
                            return getInsertTargetObj(obj.children[i]);
                        }
                    }
                }

            };
            getInsertTargetObj(insertTagArr);
            return insertTagArr;
        case 'delete_tag':
            let deleteTagArr = Object.assign([],state);
            //对每一层递归，根据key值找到目标对象
            const deleteTargetObj = function (obj) {
                if (obj.key === action.key.slice(0,action.key.length-2)){
                    for (let j=0;j<obj.children.length;j++){
                        if (obj.children[j].key === action.key){
                            obj.children.splice(j,1);
                            // getWillCreateKey(obj.children[j]);
                            // getWillInsertKey(obj.children[j],obj.children[j].key);
                            break;
                        }
                    }
                } else {
                    for (let i=0;i<obj.children.length;i++){
                        if (action.key.indexOf(obj.children[i].key)===0){
                            return deleteTargetObj(obj.children[i]);
                        }
                    }
                }

            };
            deleteTargetObj(deleteTagArr);
            console.log(
                deleteTagArr
            )
            return deleteTagArr;
        case 'update_tag':
            let updateTagArr = Object.assign([],state);
            const fn = function (obj) {
                if (obj.key === action.key){

                    if (action.prop !== 'style'){
                        obj[action.prop] = action.value;
                    } else {
                        obj[action.prop][action.innerProp] = action.value;
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
                let res = {};
                if (targetObj){
                    new Promise((resolve,reject)=>{
                        getWillCreateKey(targetObj);
                        resolve(getInsert)
                    });
                    var getInsert = new Promise(((resolve, reject) => {
                        getWillInsertKey(targetObj,action.key);
                        resolve(res = targetObj)
                    }))
                    return res
                }
                return state;

            }
        }
        case 'reset_currenttag':
            return {};
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

function getWillCreateKey(targetObj) {
    let willCreateKey = '';                 //即将新建的元素的key值
    // console.log(targetObj)
    if (targetObj && targetObj.children){
        if (JSON.stringify(targetObj.children)!=='[]') {
            let arr = [];
            for (let j = 0; j < targetObj.children.length; j++) {
                let x = targetObj.children[j].key.split('-');
                arr.push(x[x.length - 1])
            }
            willCreateKey = `${targetObj.key}-${Math.max(...arr) + 1}`;
        }
        else {
            willCreateKey = `${targetObj.key}-0`;
        }
        targetObj.willCreateKey = willCreateKey;
    }

}

function getWillInsertKey(targetObj,actionKey) {
    let key = '';
    if (actionKey === '0'){
        targetObj.willInsertKey = '';
    } else {
        let arr  = actionKey.split('-');
        key = arr.slice(0,arr.length-1).join('-');
    }
    // console.log(key)
    let childrenKeyArr = [];
    const getInsertKey = function (obj) {
        if (obj.key === key){
            // console.log(obj)
            return obj;
        } else {
            for (let i=0;i<obj.children.length;i++){
                if (actionKey.indexOf(obj.children[i].key)===0){
                    return getInsertKey(obj.children[i]);
                }
            }
        }
    };

    let parent = getInsertKey(defaultState.tagList);
    if (parent && parent.children){
        for (let i=0;i<parent.children.length;i++){
            let x = parent.children[i].key.split('-');
            childrenKeyArr.push(x[x.length-1]);
        }
        targetObj.willInsertKey = `${parent.key}-${Math.max(...childrenKeyArr)+1}`
    }

}

export default combineReducers({
    tagList,
    selectedTag,
    showDrawer,
    hoveredTagKey
});
