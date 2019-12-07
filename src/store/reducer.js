import {combineReducers} from "redux";
import {defaultState} from './state'
function tagList(state = defaultState.tagList,action) {
    switch (action.type) {
        case 'add_tag':
            let addTagArr = Object.assign([],state);
            //对每一层递归，根据key值找到目标对象
            const getCreateTargetObj = function (obj) {
                if (obj.key === action.dom.pid){
                    obj.children.push(action.dom);
                    getWillCreateKey(obj);
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
            return deleteTagArr;
        case 'update_tag':
            let updateTagArr = Object.assign([],state);
            const fn = function (obj) {
                if (obj.key === action.key){
                    if (action.prop !== 'trueStyle' && action.prop !=='viewStyle' && action.prop !== 'style'){
                        obj[action.prop] = action.value;
                    } else if (action.prop === 'style'){                //如果传的值是style，就代表trueStyle和viewStyle一样的
                        obj.viewStyle[action.innerProp] = action.value;
                        obj.trueStyle[action.innerProp] = action.value;
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
        case 'drag_tag':
            let {dropOver,originKey,targetKey,dropPosition,dropPos,isSelected} = action.drag;        //分别是【是否拖拽到目标内部】、【被拖拽的对象的key的列表（最后一位是当前对象）】、【拖拽目标】、【拖拽位置】、【是否被选中（待确定）】
            let dragTagArr = Object.assign([],state);
            let OriginObj = null;
            const getOriginObj = function (parentObj,index,obj,key) {
                if (obj.key === key){
                    OriginObj = obj;
                    tagList(undefined,{type:'delete_tag',key:obj.key});                         //因为执行的类似于剪切操作，所以要把原对象删掉
                } else {
                    for (let i=0;i<obj.children.length;i++){
                        if (key.indexOf(obj.children[i].key)===0){
                            return getOriginObj(obj,i,obj.children[i],key);
                        }
                    }
                }

            };
            getOriginObj(null,0,dragTagArr,originKey[originKey.length-1]);          //获取拖拽对象

            if (dropOver){      //直接拖拽到目标上
                const getTargetObj = function (obj,key) {
                    if (obj.key === key){                               //获取目标对象
                        if (!obj.willCreateKey){                        //如果对象没有willCreateKey，获取一个
                            getWillCreateKey(obj);
                        }
                        let will = obj.willCreateKey;
                        const handleDrag = function(obj,pid,key){                   //一层一层遍历，把拖拽过来的对象们的pid和key都改成该有的样子
                            obj.pid = pid;
                            obj.key = key;
                            if (obj.children ){
                                for (let i=0;i<obj.children.length;i++){
                                    handleDrag(obj.children[i],obj.key,obj.children[i].key.replace(originKey[originKey.length-1],will))                         //子元素的key有些特殊
                                }
                            }
                        };
                        handleDrag(OriginObj,targetKey,will);
                        obj.children.push(OriginObj);                               //然后直接push到末尾就行
                        if (isSelected){                                                        //待确认
                            selectedTag(undefined,{type:'change_currenttag',key:will})
                        }
                        getWillCreateKey(obj);                              //因为用过一次了，所以要获取新的willCreateKey
                    } else {
                        for (let i=0;i<obj.children.length;i++){
                            if (key.indexOf(obj.children[i].key)===0){
                                return getTargetObj(obj.children[i],key);
                            }
                        }
                    }
                };
                getTargetObj(dragTagArr,targetKey);
                return dragTagArr;
            } else {
                const getTargetObj = function (obj,key) {
                    if (obj.key === key){                               //获取目标对象
                        let index = dropPosition;
                        //  - Number(dropPos[dropPos.length - 1])
                        // for (let i=0;i<obj.children.length;i++){
                        //     if (key.indexOf(obj.children[i].key)===targetKey){
                        //         index = i;
                        //     }
                        // }


                        if (!obj.willCreateKey){                        //如果对象没有willCreateKey，获取一个
                            getWillCreateKey(obj);
                        }
                        let will = obj.willCreateKey;
                        const handleDrag = function(obj,pid,key){                   //一层一层遍历，把拖拽过来的对象们的pid和key都改成该有的样子
                            obj.pid = pid;
                            obj.key = key;
                            if (obj.children ){
                                for (let i=0;i<obj.children.length;i++){
                                    handleDrag(obj.children[i],obj.key,obj.children[i].key.replace(originKey[originKey.length-1],will))                         //子元素的key有些特殊
                                }
                            }
                        };
                        handleDrag(OriginObj,obj.key,will);
                        // if (index === -1){
                        //     obj.children.splice(index,0,OriginObj);
                        // }else {
                            obj.children.splice(index+1,0,OriginObj);
                        // }
                                                       //然后直接push到末尾就行
                        if (isSelected){                                                        //待确认
                            selectedTag(undefined,{type:'change_currenttag',key:will})
                        }
                        getWillCreateKey(obj);                              //因为用过一次了，所以要获取新的willCreateKey
                    } else {
                        for (let i=0;i<obj.children.length;i++){
                            if (key.indexOf(obj.children[i].key)===0){
                                return getTargetObj(obj.children[i],key);
                            }
                        }
                    }
                };
                let parentKey = targetKey.split('-');
                parentKey.pop();
                getTargetObj(dragTagArr,parentKey.join('-'));
                return dragTagArr;
            }
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
                    }));
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

function nocssStyle(state = defaultState.nocssStyle,action) {
    switch (action.type) {
        case 'change_nocssTyle': {
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
            return list
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

export default combineReducers({
    tagList,
    selectedTag,
    showDrawer,
    showCode,
    hoveredTagKey,
    nocssStyle,
    hoverStyle,
    hoverList,
    classList,
    nav
});
