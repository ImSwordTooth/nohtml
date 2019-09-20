import store from './index'

export function addTag(dom) {
    store.dispatch({type:'ADD_TAG',dom})
    console.log(store.getState())
}

export function updateTag(dom) {
    return{
        type:'updateTag',
        dom
    }
}

export function setPageTitle(data) {
    return (dispatch,getState)=>{
        dispatch({type:'SET_PAGETITLE',data:data})
    }
}
