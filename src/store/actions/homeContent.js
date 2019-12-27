

import { oAuthAxios } from '../../utils/api';

import * as actionTypes from './actionTypes';


export const sortChangeStart = (order) => {
    return {
        type: actionTypes.ON_SORT_CHANGE_START,
        order: order
    };
}

export const sortChangeFail = (error) => {
    return {
        type: actionTypes.ON_SORT_CHANGE_FAIL,
        error: error
    };
}

export const sortChangeSuccess = (data) => {

    return {
        type: actionTypes.ON_SORT_CHANGE_SUCCESS,
        data: data

    }
}

export const fetchCommentSuccess = (data) => {
    return {
        type: actionTypes.FETCH_COMMENT_SUCCESS,
        data: data

    }
}

export const voteStart = () => {
    return {
        type: actionTypes.VOTE_START
    };
}

export const voteSuccess = () => {
    return {
        type: actionTypes.VOTE_SUCCESS
    }

}

export const voteFail = (data) => {
    return {
        type: actionTypes.VOTE_FAIL
    }
}

export const onCloseModal = () => {
    return {
        type: actionTypes.CLOSE_MODAL
    };
}

export const fetchPostComments = (data, tokenValue) => {
  
    return dispatch => {
        //  if(order ==='hot' || order === 'popular' || order === 'rising'){
        dispatch(sortChangeStart(''));
        let token = tokenValue;
        const config = {
            headers: { 'Authorization': "bearer " + token }
        };
        oAuthAxios.get(`${data.permalink}`, config)
            .then(function (response) {
                if (response.data.error) {
                    dispatch(sortChangeFail(response.data.error));
                } else {
                    dispatch(fetchCommentSuccess(response.data[1]));
                }
            })
            .catch(function (error) {
                console.log(error)
                if (error && error.data && error.data.message) {

                    dispatch(sortChangeFail(error.data.message));
                }
            });
        //  }
    };
}
export const fnSetModalItem = (data) => {
    console.log(data);
}
export const vote = (id, dir, tokenValue) => {

    return dispatch => {
        dispatch(voteStart());
        oAuthAxios.post(`/api/vote`, null, {
            params: {
                'id': id,
                'dir': dir
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': "bearer " + tokenValue
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data.error) {
                    dispatch(voteFail());
                } else {
                    dispatch(voteSuccess());
                    if (dir === 1) {
                        alert('upvoted');
                    } else {
                        alert('downvoted');
                    }
                    //     window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
                dispatch(voteFail());
            });


    }


}

export const onLoadMore = (order, after, tokenValue) => {
    return dispatch => {
        //  if(order ==='hot' || order === 'popular' || order === 'rising'){
        dispatch(sortChangeStart(order));
        let token = tokenValue;
        const config = {
            headers: { 'Authorization': "bearer " + token }
        };
        let url;
        if (order === 'hot' || order === 'rising' || order === 'random') {
            url = '/r/subreddits'
        } else {
            url = '/subreddits';
        }
        oAuthAxios.get(`${url}/${order}?limit=5`, config)
            .then(function (response) {
                if (response.data.error) {
                    dispatch(sortChangeFail(response.data.error));
                } else {
                    dispatch(sortChangeSuccess(response.data.data));
                }
            })
            .catch(function (error) {

                dispatch(sortChangeFail(error.data.message));
            });
        //  }
    };
}
export const onSortChange = (order, tokenValue) => {
    return dispatch => {
        //     if(order ==='hot' || order === 'popular' || order === 'rising'){

        dispatch(sortChangeStart(order));
        let token = tokenValue;
        const config = {
            headers: { 'Authorization': "bearer " + token }
        };
        let url;
        if (order === 'hot' || order === 'rising' || order === 'random') {
            url = '/r/subreddits'
        } else {
            url = '/subreddits';
        }
        oAuthAxios.get(`${url}/${order}?limit=15`, config)
            .then(function (response) {

                if (response.data.error) {
                    dispatch(sortChangeFail(response.data.error));
                } else {
                    console.log(response.data)
                    dispatch(sortChangeSuccess(response.data.data));
                }
            })
            .catch(function (error) {

                dispatch(sortChangeFail(error.data.message));
            });
        // }
    };

}

export const setItemInModal = (data) => {
    return {
        type: actionTypes.SET_MODAL_ITEM_REQUEST,
        item: data

    }
}


export const setModalItem = (item) => {
    console.log(item);
    return dispatch => {
        dispatch(setItemInModal(item));
    }
}



export const expandItem = (item) => {
    const request = itemName => ({ type: actionTypes.EXPAND_ITEM_REQUEST, itemName });
   
    return (dispatch) => {
        dispatch(request(item.name));
    };
}