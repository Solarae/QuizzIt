import {
    GET_PROFILE_REQ,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    GET_INBOX_REQ,
    GET_INBOX_SUCCESS,
    GET_INBOX_FAIL,
    RECEIVE_NOTIFICATIONS,
    READ_NOTIFICATION_SUCCESS,
    READ_NOTIFICATION_FAIL,
    GET_FRIENDREQUESTS_REQ,
    GET_FRIENDREQUESTS_SUCCESS,
    GET_FRIENDREQUESTS_FAIL,
    SEND_FRIENDREQUEST_SUCCESS,
    SEND_FRIENDREQUEST_FAIL,
    ACCEPT_FRIENDREQUEST_SUCCESS,
    ACCEPT_FRIENDREQUEST_FAIL,
    DECLINE_FRIENDREQUEST_SUCCESS,
    DECLINE_FRIENDREQUEST_FAIL,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    DELETE_PROFILE_SUCCESS,
    DELETE_PROFILE_FAIL,
    RECEIVE_FRIENDREQUEST,
    GET_FRIENDS_REQ,
    GET_FRIENDS_SUCCESS,
    GET_FRIENDS_FAIL,
    UNFRIEND_SUCCESS,
    UNFRIEND_FAIL
} from '../actions/types'

import axios from 'axios'


import { URL } from '../config.js'

axios.defaults.withCredentials = true;

export const getProfile = ({ id }) => async (dispatch) => {
    console.log("Getting: " + id)
    let config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            _id: id,
            offset: 0,
            limit: 1
        }
    }
    try {
        dispatch({
            type: GET_PROFILE_REQ
        });
        let res = await axios.get(`${URL}/api/users/`, config);

        if (res.data.errors) {
            dispatch({
                type: GET_PROFILE_FAIL,
                payload: res.data
            })
        }
        else {
            if (res.data.users.length !== 1) {
                dispatch({
                    type: GET_PROFILE_FAIL,
                    payload: res.data
                })
            }
            const user = res.data.users[0]

            // get subscribedPlatforms, likedQuizzes, awards, createdPlatforms
            let subscribedPlatforms = []
            config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    'subscribers.userId': user._id
                }
            }
            res = await axios.get(`${URL}/api/platforms`, config);
            if (!res.data.errors) {
                subscribedPlatforms = res.data.platforms
            }

            let likedQuizzes = []
            config.params = {
                'likes.likedBy': user._id,
                'expand': "platformId(select=name,icon)",
            }
            res = await axios.get(`${URL}/api/quizzes/`, config);
            if (!res.data.errors) {
                likedQuizzes = res.data.quizzes
            }

            let awards = []
            for (const aid of user.awards) {
                res = await axios.get(`${URL}/api/awards/${aid}`,);
                if (!res.data.errors) {
                    awards.push(res.data.award)
                }
            }

            let createdPlatforms = []
            config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    'owner': user._id
                }
            }
            res = await axios.get(`${URL}/api/platforms`, config);
            if (!res.data.errors) {
                createdPlatforms = res.data.platforms
            }

            dispatch({
                type: GET_PROFILE_SUCCESS,
                payload: {
                    profile: user,
                    subscribedPlatforms: subscribedPlatforms,
                    likedQuizzes: likedQuizzes,
                    awards: awards,
                    createdPlatforms: createdPlatforms
                }
            });
        }
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: GET_PROFILE_FAIL
        })
    }

}

export const editProfile = ({ id, username, email, password, currentPassword, history, callback }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ id, username, email, password, currentPassword })
    try {
        const res = await axios.post(`${URL}/api/users/edit`, body, config)
        if (res.data.errors) {
            dispatch({
                type: EDIT_PROFILE_FAIL
            })
        }
        else {
            dispatch({
                type: EDIT_PROFILE_SUCCESS,
                payload: res.data
            })

        }

        // send any request errors to callback function
        callback(res.data.errors);

        // history.push(`/profile/${id}/edit`)
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: EDIT_PROFILE_FAIL
        })
    }
}

export const deleteProfile = ({ id, password, history, callback }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ id, password })
    try {
        const res = await axios.post(`${URL}/api/users/delete`, body, config)
        if (res.data.errors) {
            dispatch({
                type: DELETE_PROFILE_FAIL
            })
        }
        else {
            dispatch({
                type: DELETE_PROFILE_SUCCESS,
                payload: res.data
            })

        }

        // send any request errors to callback function
        callback(res.data.errors);

        // redirect to home page if no errors 
        if (!res.data.errors) {
            history.push('/');
        }
    } catch (error) {
        dispatch({
            type: DELETE_PROFILE_FAIL
        })
    }
}

export const updateUser = ({ newValue, userId }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ newValue, userId })
    try {
        const res = await axios.post(`${URL}/api/users/update`, body, config);

        if (res.data.errors) {
            dispatch({
                type: EDIT_PROFILE_FAIL,
                payload: res.data
            })
        }
        else {
            dispatch({
                type: EDIT_PROFILE_SUCCESS,
                payload: res.data
            })
        }

    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: EDIT_PROFILE_FAIL
        })
    }
}

export const getInbox = (id, currMax) => async (dispatch) => {
    const config = {
        params: {
            offset: currMax,
            limit: 5
        }
    }

    if (currMax === 0)
        dispatch({
            type: GET_INBOX_REQ
        })
    try {
        const res = await axios.get(`${URL}/api/users/${id}/inbox`, config)
        if (res.data.errors) {
            dispatch({
                type: GET_INBOX_FAIL,
                payload: res.data
            })
        } else {
            console.log(res.data)
            dispatch({
                type: GET_INBOX_SUCCESS,
                payload: res.data
            })
        }
    } catch (error) {
        console.log("error message: " + error.message);
    }
}

export const receiveNotifications = (notifications) => (dispatch) => {
    dispatch({
        type: RECEIVE_NOTIFICATIONS,
        payload: notifications
    })
}

export const readNotification = (userId, notifId) => async (dispatch) => {
    try {
        const res = await axios.post(`${URL}/api/users/${userId}/inbox/notification/${notifId}/read`)

        if (res.data.errors) {
            dispatch({
                type: READ_NOTIFICATION_FAIL,
                payload: res.data
            })
        } else {
            dispatch({
                type: READ_NOTIFICATION_SUCCESS,
                payload: res.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getFriendRequests = (id, currMax) => async (dispatch) => {
    const config = {
        params: {
            offset: currMax,
            limit: 5
        }
    }

    if (currMax === 0)
        dispatch({
            type: GET_FRIENDREQUESTS_REQ
        })

    try {
        const res = await axios.get(`${URL}/api/users/${id}/friendRequests`, config)
        if (res.data.errors) {
            dispatch({
                type: GET_FRIENDREQUESTS_FAIL,
                payload: res.data
            })
        } else {
            console.log(res.data)
            dispatch({
                type: GET_FRIENDREQUESTS_SUCCESS,
                payload: res.data
            })
        }
    } catch (error) {
        console.log("error message: " + error.message);
    }
}

export const sendFriendRequest = (id, recipientId) => async (dispatch) => {
    try {
        const res = await axios.post(`${URL}/api/users/${recipientId}/friendRequests/${id}/send`)
        if (res.data.errors) {
            dispatch({
                type: SEND_FRIENDREQUEST_FAIL,
                payload: res.data
            })
        } else {
            console.log(res.data)
            dispatch({
                type: SEND_FRIENDREQUEST_SUCCESS,
                payload: res.data
            })
        }
    } catch (error) {
        console.log("error message: " + error.message);
    }
}

export const acceptFriendRequest = (id, userId) => async (dispatch) => {
    try {
        const res = await axios.post(`${URL}/api/users/${id}/friendRequests/${userId}/accept`)
        if (res.data.errors) {
            dispatch({
                type: ACCEPT_FRIENDREQUEST_FAIL,
                payload: res.data
            })
        } else {
            console.log(res.data)
            dispatch({
                type: ACCEPT_FRIENDREQUEST_SUCCESS,
                payload: res.data
            })
        }
    } catch (error) {
        console.log("error message: " + error.message);
    }
}

export const declineFriendRequest = (id, userId) => async (dispatch) => {
    try {
        const res = await axios.post(`${URL}/api/users/${id}/friendRequests/${userId}/decline`)
        if (res.data.errors) {
            dispatch({
                type: DECLINE_FRIENDREQUEST_FAIL,
                payload: res.data
            })
        } else {
            console.log(res.data)
            dispatch({
                type: DECLINE_FRIENDREQUEST_SUCCESS,
                payload: res.data
            })
        }
    } catch (error) {
        console.log("error message: " + error.message);
    }
}

export const receiveFriendRequest = (friendRequest) => (dispatch) => {
    dispatch({
        type: RECEIVE_FRIENDREQUEST,
        payload: friendRequest
    })
}

export const getFriends = (id, page) => async (dispatch) => {
    const config = {
        params: {
            offset: 10 * (page - 1),
            limit: 10
        }
    }
    console.log(page)

    dispatch({
        type: GET_FRIENDS_REQ
    })

    try {
        const res = await axios.get(`${URL}/api/users/${id}/friends`, config)
        if (res.data.errors) {
            dispatch({
                type: GET_FRIENDS_FAIL,
                payload: res.data
            })
        } else {
            console.log(res.data)
            dispatch({
                type: GET_FRIENDS_SUCCESS,
                payload: res.data
            })
        }
    } catch (error) {
        console.log("error message: " + error.message);
    }
}

export const unfriend = (id, userId) => async (dispatch) => {
    console.log(id)
    try {
        const res = await axios.post(`${URL}/api/users/${id}/friends/${userId}/unfriend`)
        if (res.data.errors) {
            dispatch({
                type: UNFRIEND_FAIL,
                payload: res.data
            })
        } else {
            console.log(res.data)
            dispatch({
                type: UNFRIEND_SUCCESS,
                payload: res.data
            })
        }
    } catch (error) {
        console.log("error message: " + error.message);
    }
}

export const uploadImage = (id, image) => async (dispatch) => {
    try {
        const formData = new FormData()
        formData.append('image', image)

        const res = await axios.post(`${URL}/api/users/${id}/upload`, formData);
        dispatch({
            type: EDIT_PROFILE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log("error message: " + error.message);
        dispatch({
            type: EDIT_PROFILE_FAIL,
            payload: error.response.data
        })
    }
}