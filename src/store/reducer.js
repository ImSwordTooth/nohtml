
import {combineReducers} from "redux";
import defaultState from './state'


function tagList(state = defaultState.tagList,action) {
    switch (action.type) {
        case 'ADD_TAG':
            let arr = Object.assign([],state);
           arr.push(action.dom)
            return arr;
        default:return state;
    }

}

function pageTitle(state = defaultState.pageTitle,action) {
    switch (action.type) {
        case 'SET_PAGETITLE':return action.data;
        default:return state
    }
}

export default combineReducers({
    tagList,
    pageTitle
});
