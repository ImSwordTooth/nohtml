import store from './index'
import {webSocketLinkServe} from "../common/api";

export function changeNav(nav) {
    store.dispatch({type:'change_nav',nav})
}

export function changeTagList(tagList) {
    store.dispatch({type:'change_tagList',tagList})
}

//添加元素
export function addTag(dom,type=1) {
    store.dispatch({type:'add_tag',dom});
    if (store.getState().loginStatus === 2 && type === 1){
        webSocketLinkServe({
            type:0,         //0 客户端， 1 服务器端
            userName:store.getState().user.userName,             //TODO 改成真正的用户名
            functionName:'addTag',
            args:[dom,0]
        });
    }
}

//插入元素
export function insertTag(dom,type=1) {

    store.dispatch({type:'insert_tag',dom,selectedKey:store.getState().selectedTag.key});
    if (store.getState().loginStatus === 2 && type === 1) {
        webSocketLinkServe({
            type: 0,
            functionName: 'insertTag',
            userName: store.getState().user.userName,             //TODO 改成真正的用户名
            args: [dom,0,store.getState().selectedTag.key]
        });
    }
}

export function deleteTag(key,type=1) {
    store.dispatch({type:'delete_tag',key});
    store.dispatch({type:'change_drawer',status:false});
    store.dispatch({type:'reset_currenttag'});
    if (store.getState().loginStatus === 2 && type === 1) {
        webSocketLinkServe({
            type:0,
            userName: store.getState().user.userName,             //TODO 改成真正的用户名
            functionName: 'deleteTag',
            args: [key,0]
        });
    }
}

//修改元素属性
export function updateTag(update,type=1) {
        store.dispatch({
            type:'update_tag',
            prop:update.prop,           //表示改变的是一个属性值
            innerProp:update.innerProp || '',         //如果style要改变，把要变的style的属性值传过来，比如color
            value:update.value,
            key:store.getState().selectedTag.key
        });
        if (store.getState().loginStatus === 2 && type === 1) {
            webSocketLinkServe({
                type:0,
                userName: store.getState().user.userName,             //TODO 改成真正的用户名
                functionName: 'updateTag',
                args: [{
                    prop: update.prop,
                    innerProp: update.innerProp || '',
                    value: update.value,
                    key: store.getState().selectedTag.key
                },0]
            })
        }
}

export function dropTag(drag,type=1) {
    store.dispatch({type:'drag_tag',drag});
    if (store.getState().loginStatus === 2 && type === 1) {
        webSocketLinkServe({
            type:0,
            userName: store.getState().user.userName,             //TODO 改成真正的用户名
            functionName: 'dropTag',
            args: [drag,0]
        })
    }
}

//更新当前选中元素  TODO 原来的
// export function changeCurrentTag(key) {
//     store.dispatch({type:'change_currenttag',key});
// }

export function changeCurrentTag(key,list) {
    store.dispatch({type:'change_currenttag',key,list});
}

export function reSetTag() {
    store.dispatch({type:'reset_currenttag'});
}

export function changeDrawer(status) {
    store.dispatch({type:'change_drawer',status})
}

export function changeCode(status) {
    store.dispatch({type:'change_code',status})
}

//修改hover时的标签
export function changeHoveredTag(key) {
    store.dispatch({type:'change_hoveredTagKey',key})
}

//修改nocss的样式
export function changeNocssStyle(style) {
    store.dispatch({type:'change_nocssStyle',style})
}

export function changeHoverStyle(style) {
    store.dispatch({type:'change_hoverStyle',style})
}

export function changeCustomerCssStyle(style) {
    store.dispatch({type:'change_customerCssStyle',style})
}

export function changeCustomerHoverStyle(style) {
    store.dispatch({type:'change_customerHoverStyle',style})
}

export function deleteCustomerCssStyle(prop) {
    store.dispatch({type:'delete_customerCssStyle',prop})
}

export function deleteCustomerHoverStyle(prop) {
    store.dispatch({type:'delete_customerHoverStyle',prop})
}

export function addHoverList(comp) {
    store.dispatch({type:'add_hoverList',comp})
}

export function deleteHoverList(propName) {
    store.dispatch({type:'delete_hoverList',propName})
}

export function addClassList(classInfo,type=1){
    store.dispatch({type:'add_classlist',classInfo});
    if (store.getState().loginStatus === 2 && type === 1) {
        webSocketLinkServe({
            type:0,
            userName: store.getState().user.userName,             //TODO 改成真正的用户名
            functionName: 'addClassList',
            args: [classInfo,0]
        })
    }
}

export function updateClassList(classInfo,index,type=1) {
    store.dispatch({
        type:'update_classlist',
        index,
        classInfo
    });
    if (store.getState().loginStatus === 2 && type === 1) {
        webSocketLinkServe({
            type:0,
            userName: store.getState().user.userName,             //TODO 改成真正的用户名
            functionName: 'updateClassList',
            args: [classInfo, index,0]
        })
    }
}

export function updateSetting(setting,type=1) {
    store.dispatch({type:'update_setting',setting});
    if (store.getState().loginStatus === 2 && type === 1) {
        webSocketLinkServe({
            type:0,
            userName: store.getState().user.userName,             //TODO 改成真正的用户名
            functionName: 'updateSetting',
            args: [setting]
        })
    }
}

export function addKeyFrames(keyframe) {
    store.dispatch({type:'add_keyFrames',keyframe})
}

export function changeLoginStatus(status) {
    store.dispatch({type:'change_loginStatus',status})
}

export function changeUser(user) {
    store.dispatch({type:'change_user',user})
}
