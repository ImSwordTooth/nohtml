import {combineReducers} from "redux";
import {defaultState} from './state'
import {getObjByKeyFromTagList} from '../common/units'
import store from '../store'

function tagList(state = defaultState.tagList,action) {
    switch (action.type) {
        case 'change_tagList':{
            return action.tagList;
        }
        case 'add_tag':
            let addTag = Object.assign({},state);
            let addTagObj = getObjByKeyFromTagList(action.dom.pid,addTag);
            addTagObj.children.push(action.dom);
            //TODO 此处应由后端给出，此处先用本地,下同
            addTagObj.willCreateKey++;
            return addTag;
        case 'insert_tag':
            let insertTag = Object.assign({},state);
            let insertObj = getObjByKeyFromTagList(action.dom.pid,insertTag);
            for (let j=0;j<insertObj.children.length;j++){
                if (insertObj.children[j].key === action.selectedKey){
                    insertObj.children.splice(j+1,0,action.dom);
                    insertObj.willCreateKey++;
                    break;
                }
            }
            return insertTag;
        case 'delete_tag':
            let deleteTag = Object.assign({},state);
            let deleteTagObj = getObjByKeyFromTagList(action.key.slice(0,action.key.length-2),deleteTag);
            for (let j=0;j<deleteTagObj.children.length;j++){
                if (deleteTagObj.children[j].key === action.key){
                    deleteTagObj.children.splice(j,1);
                    break;
                }
            }
            return deleteTag;
        case 'update_tag':
            let updateTag = Object.assign({},state);
            let ignore = ['trueStyle','viewStyle','hoverTrueStyle','hoverViewStyle','style','hover','props'];           //除了数组里的元素，其他的直接是 obj[a] = b;
            let updateObj = getObjByKeyFromTagList(action.key,updateTag);
            if (!ignore.includes(action.prop)){
                updateObj[action.prop] = action.value;
            } else if (action.prop === 'style'){                //如果传的值是style，就代表trueStyle和viewStyle一样的
                updateObj.viewStyle[action.innerProp] = action.value;
                updateObj.trueStyle[action.innerProp] = action.value;
            } else if (action.prop === 'hover') {
                updateObj.hoverViewStyle[action.innerProp] = action.value;
                updateObj.hoverTrueStyle[action.innerProp] = action.value;
            } else {
                updateObj[action.prop][action.innerProp] = action.value;
            }
            return updateTag;
        case 'drag_tag':
            //分别是【是否拖拽到目标内部】、【被拖拽的对象的key的列表（最后一位是当前对象）】、【拖拽目标key】、【拖拽位置,不是top就是bottom】
            let {dropOver,originKey,targetKey,dropPosition} = action.drag;
            let dragTag = Object.assign({},state);
            let originObj = getObjByKeyFromTagList(originKey[originKey.length-1],dragTag);      //获取拖拽对象
            tagList(undefined,{type:'delete_tag',key:originObj.key});       //因为执行的类似于剪切操作，所以要把原对象删掉
            if (dropOver){      //直接拖拽到目标上
                let dropOverTargetObj = getObjByKeyFromTagList(targetKey,dragTag);          //获取目标对象
                let will = `${dropOverTargetObj.key}-${dropOverTargetObj.willCreateKey}`;
                const handleDrag = function(obj,pid,key){                   //一层一层遍历，把拖拽过来的对象们的pid和key都改成该有的样子
                    obj.pid = pid;
                    obj.key = key;
                    if (obj.children ){
                        for (let i=0;i<obj.children.length;i++){
                            handleDrag(obj.children[i], obj.key, obj.children[i].key.replace(originKey[originKey.length-1],will))                         //子元素的key有些特殊
                        }
                    }
                };
                handleDrag(originObj,targetKey,will);
                dropOverTargetObj.children.push(originObj);                               //然后直接push到末尾就行
                dropOverTargetObj.willCreateKey++;                              //因为用过一次了，所以要获取新的willCreateKey
                return dragTag;
            } else {
                let notDropOverTargetObj = getObjByKeyFromTagList(targetKey,dragTag);           //获取拖拽目标
                let notDropOverTargetParentObj = getObjByKeyFromTagList(notDropOverTargetObj.pid,dragTag);       //获取拖拽目标的父元素，因为这算是父元素的新增
                let will = `${notDropOverTargetParentObj.key}-${notDropOverTargetParentObj.willCreateKey}`;
                const handleDrag = function(obj,pid,key){                   //一层一层遍历，把拖拽过来的对象们的pid和key都改成该有的样子
                    obj.pid = pid;
                    obj.key = key;
                    if (obj.children ){
                        for (let i=0;i<obj.children.length;i++){
                            handleDrag(obj.children[i], obj.key, obj.children[i].key.replace(originKey[originKey.length-1],will))                         //子元素的key有些特殊
                        }
                    }
                };
                handleDrag(originObj,notDropOverTargetObj.key,will);
                for (let i=0; i<notDropOverTargetParentObj.children.length; i++){
                    if (notDropOverTargetParentObj.children[i].key === targetKey){
                        if (dropPosition === 'top'){
                            notDropOverTargetParentObj.children.splice(i,0,originObj);
                            break;
                        } else {
                            notDropOverTargetParentObj.children.splice(i+1,0,originObj);
                            break;
                        }
                    }
                }
                notDropOverTargetParentObj.willCreateKey++;
                return dragTag;
            }
        default:return state;
    }

}

function selectedTag(state = defaultState.selectedTag,action) {
    switch (action.type) {
        case 'change_currenttag':{
            // return getObjByKeyFromTagList(action.key, defaultState.tagList);
            return getObjByKeyFromTagList(action.key, action.list);

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

function showCode(state = defaultState.showCode,action) {
    switch (action.type) {
        case 'change_code':return action.status;
        default:return state;
    }
}

function hoveredTagKey(state = defaultState.hoveredTagKey,action) {
    switch (action.type) {
        case 'change_hoveredTagKey':return action.key;
        default:return state;
    }
}

function nocssStyle(state = defaultState.nocssStyle,action) {
    switch (action.type) {
        case 'change_nocssStyle': {
            let obj = Object.assign({}, state);
            obj[action.style.prop] = action.style.value;
            return obj;
        }
        default:{
            return state;
        }
    }
}

function hoverStyle(state = defaultState.hoverStyle,action) {
    switch (action.type) {
        case 'change_hoverStyle': {
            let obj = Object.assign({}, state);
            obj[action.style.prop] = action.style.value;
            return obj;
        }
        default:{
            return state;
        }
    }
}

function customerCssStyle(state = defaultState.customerCssStyle,action) {
    switch (action.type) {
        case 'change_customerCssStyle': {
            let obj = Object.assign({}, state);
            obj[action.style.prop] = action.style.value;
            return obj;
        }
        case 'delete_customerCssStyle':{
            let obj = Object.assign({}, state);
            delete obj[action.prop];
            return obj;
        }
        default:{
            return state;
        }
    }
}

function customerHoverStyle(state = defaultState.customerHoverStyle,action) {
    switch (action.type) {
        case 'change_customerHoverStyle': {
            let obj = Object.assign({}, state);
            obj[action.style.prop] = action.style.value;
            return obj;
        }
        case 'delete_customerHoverStyle': {
            let obj = Object.assign({}, state);
            delete obj[action.prop];
            return obj;
        }
        default:{
            return state;
        }
    }
}

function hoverList(state = defaultState.hoverList,action) {
    switch (action.type) {
        case 'add_hoverList':{
            let obj = Object.assign({}, state);
            obj[action.comp.prop] = action.comp.comp;
            return obj;
        }
        case 'delete_hoverList':{
            let obj = Object.assign({}, state);
            delete obj[action.propName];
            return obj;
        }
        default:{
            return state;
        }
    }
}

function classList(state = defaultState.classList,action) {
    switch (action.type) {
        case 'add_classlist':{
            let list = state.slice();
            list.push(action.classInfo);
            return list;
        }
        case 'update_classlist':{
            let list = JSON.parse(JSON.stringify(state));
            list.splice(action.index,1,action.classInfo);
            return list;
        }
        default:{
            return state;
        }
    }
}

function keyframesList(state = defaultState.keyframesList,action) {
    switch (action.type) {
        case 'add_keyFrames':{
            let list = state.slice();
            list.push(action.keyframe);
            return list;
        }
        default:{
            return state;
        }
    }
}

function setting(state = defaultState.setting,action) {
    switch (action.type) {
        case 'update_setting':{
            let obj = Object.assign({},state);
            obj[action.setting.prop] = action.setting.value;
            return obj;
        }
        default:{
            return state;
        }
    }
}

function nav(state = defaultState.nav,action) {
    switch (action.type) {
        case 'change_nav':{
            return action.nav
        }
        default:{
            return state
        }
    }
}

function loginStatus(state = defaultState.loginStatus,action) {
    switch (action.type) {
        case 'change_loginStatus':{
            return action.status;
        }
        default:return state;
    }
}

//登录后的用户信息
function user(state = defaultState.user,action) {
    switch (action.type) {
        case 'change_user':{
            return action.user;
        }
        default:return state;
    }
}

export default combineReducers({
    tagList,
    selectedTag,
    showDrawer,
    showCode,
    hoveredTagKey,
    nocssStyle,
    hoverStyle,
    hoverList,
    customerCssStyle,
    customerHoverStyle,
    classList,
    nav,
    keyframesList,
    setting,
    loginStatus,
    user
});
