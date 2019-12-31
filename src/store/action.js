import store from './index'

export function changeNav(nav) {
    store.dispatch({type:'change_nav',nav})
}

//添加元素
export function addTag(dom) {
    store.dispatch({type:'add_tag',dom});
}


//插入元素
export function insertTag(dom) {
    store.dispatch({type:'insert_tag',dom,selectedKey:store.getState().selectedTag.key});
}

export function deleteTag(key) {
    store.dispatch({type:'delete_tag',key});
    store.dispatch({type:'change_drawer',status:false});
    store.dispatch({type:'reset_currenttag'})
}

//修改元素属性
export function updateTag(update) {
        store.dispatch({
            type:'update_tag',
            prop:update.prop,           //表示改变的是一个属性值
            innerProp:update.innerProp || '',         //如果style要改变，把要变的style的属性值传过来，比如color
            value:update.value,
            key:store.getState().selectedTag.key
        })
}

export function dropTag(drag) {
    store.dispatch({type:'drag_tag',drag})
}

//更新当前选中元素
export function changeCurrentTag(key) {
    store.dispatch({type:'change_currenttag',key});
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

export function addClassList(classInfo){
    store.dispatch({type:'add_classlist',classInfo})
}

export function updateCLassList(classInfo,index) {
    store.dispatch({
        type:'update_classlist',
        index,
        classInfo
    })
}

export function updateSetting(setting) {
    store.dispatch({type:'update_setting',setting})
}

export function addKeyFrames(keyframe) {
    store.dispatch({type:'add_keyFrames',keyframe})
}
