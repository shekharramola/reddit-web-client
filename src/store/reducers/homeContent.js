
import * as actionTypes from '../actions/actionTypes';
import { updateObject, normalizePosts, allCollection } from '../../utility';

import { find, has, reject } from 'lodash/fp';

const initialState = {
  token: localStorage.getItem('token'),
  items: [],
  model: {},
  after: '',
  loading: false,
  error: false,
  sort: 'hot',
  currentModalItem: null,
  isModelOpen: false,
  comments: {
    fetching: false
  }
};
const sortChangeStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, sort: action.order });
}

const sortChangeSuccess = (state, action) => {
  return updateObject(state, {
    fetching: false,
    items: action.data.children,
    model: normalizePosts(action.data.children, 'name'),
    allPosts: allCollection(action.data.children, 'name'),
    after: action.data.after,
    loading: false
  })
}

const sortChangeFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false })

}



const fetchCommentSuccess = (state, action) => {
 
  const postComments = reject(item => item.kind === 'more', action.data.data.children);
  const tempComment = { [state.currentModalItem.name]: normalizePosts(postComments) };
  const updatedComment = tempComment;
  const updatedState = {
    comments: updatedComment,
    loading: false
  }
  return updateObject(state, updatedState);


}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_SORT_CHANGE_START: return sortChangeStart(state, action);
    case actionTypes.ON_SORT_CHANGE_SUCCESS: return sortChangeSuccess(state, action);
    case actionTypes.ON_SORT_CHANGE_FAIL: return sortChangeFail(state, action);
    case actionTypes.FETCH_COMMENT_SUCCESS: return fetchCommentSuccess(state, action)
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,

        currentModalItem: null,
        isModelOpen: false
      }
    case actionTypes.SET_MODAL_ITEM_REQUEST:
    
      return {
        ...state,
        currentModalItem: action.item,
        isModelOpen: true
      }
    case actionTypes.EXPAND_ITEM_REQUEST:
      let item = find(i => (i.data.name === action.itemName), state.items);
      let post = has(action.itemName, state.model) && state.model[action.itemName];
      const itemIndex = state.items.indexOf(item);
      let isExpanded = true;
      if (item.data.isExpanded) {
        isExpanded = false;
      }

      const data = {
        ...item.data,
        isExpanded,
      };

      return {
        ...state,
        items: [
          ...state.items.slice(0, itemIndex),
          { ...item, data },
          ...state.items.slice(itemIndex + 1),
        ],
        model: {
          ...state.model,
          [post.name]: {
            ...post,
            ...data,
          },
        },
      };
    // case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;