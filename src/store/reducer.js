
import {combineReducers} from "redux";
import defaultState from './state'


function tagList(state = defaultState.tagList,action) {
    switch (action.type) {
        case 'add_tag':
            let arr = Object.assign([],state);
           arr.push(action.dom)
            return arr;
        default:return state;
    }

}

function selectedTag(state = defaultState.selectedTag,action) {
    switch (action.type) {
        case 'change_currenttag':return action.id;
        default:return state
    }
}

export default combineReducers({
    tagList,
    selectedTag
});
