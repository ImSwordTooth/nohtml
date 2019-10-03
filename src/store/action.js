import store from './index'

//添加元素
export function addTag(dom) {
    store.dispatch({type:'add_tag',dom});
}

//修改元素属性
export function updateTag(update) {
        store.dispatch({type:'change_currentTagProp',update});
        store.dispatch({
            type:'update_tag',
            prop:update.prop,
            value:update.value,
            key:store.getState().selectedTag.key
        })

}

//更新当前选中元素
export function changeCurrentTag(key) {
    store.dispatch({type:'change_currenttag',key});
}

export function setPageTitle(data) {
    return (dispatch,getState)=>{
        dispatch({type:'SET_PAGETITLE',data:data})
    }
}
