import store from './index'

//添加元素
export function addTag(dom) {

    let length = store.getState().tagList.length;
    store.dispatch({type:'add_tag',dom,})
    console.log(store.getState())
}

export function updateTag(dom) {
    return{
        type:'updateTag',
        dom
    }
}

//更新当前选中元素
export function changeCurrentTagId(id) {
    store.dispatch({type:'change_currenttag',id});
}

export function setPageTitle(data) {
    return (dispatch,getState)=>{
        dispatch({type:'SET_PAGETITLE',data:data})
    }
}
