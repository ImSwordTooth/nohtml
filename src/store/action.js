import store from './index'

//添加元素
export function addTag(dom) {

    store.dispatch({type:'add_tag',dom});
}

export function updateTag(dom) {
    return{
        type:'updateTag',
        dom
    }
}

//更新当前选中元素
export function changeCurrentTagId(key) {
    store.dispatch({type:'change_currenttag',key});
}

export function setPageTitle(data) {
    return (dispatch,getState)=>{
        dispatch({type:'SET_PAGETITLE',data:data})
    }
}
