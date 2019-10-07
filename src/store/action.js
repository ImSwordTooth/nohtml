import store from './index'

//添加元素
export function addTag(dom) {
    store.dispatch({type:'add_tag',dom});
}

//修改元素属性
export function updateTag(update) {
        // store.dispatch({type:'change_currentTagProp',update});
        store.dispatch({
            type:'update_tag',
            prop:update.prop,           //表示改变的是一个属性值
            innerProp:update.innerProp || '',         //如果style要改变，把要变的style的属性值传过来，比如color
            value:update.value,
            key:store.getState().selectedTag.key
        })
}

//更新当前选中元素
export function changeCurrentTag(key) {
    store.dispatch({type:'change_currenttag',key});
}

export function changeDrawer(status) {
    store.dispatch({type:'change_drawer',status})
}

export function changeHoveredTag(key) {
    store.dispatch({type:'change_hoveredTagKey',key})
}
