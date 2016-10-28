import * as api from '../api'
import * as UTIL from '../services/utils'

/**
 * nav button action
 */
export const navAction = (payload) => {
    return {
        type: 'A_NAV',
        payload
    }
}

export const fetchRecordRequestSent = (range) => {
    return {
        type: 'E_REQ_SENT',
        value: 'fetch booking record ' + range,
    }
}

export const fetchRecordFailed = (statusText) => {
    return {
        type: 'E_REQ_FAILED',
        value: statusText,
    }
}

export const fetchRecordSuccess = (data, range) => {
    return {
        type: 'E_REQ_SUCCESS',
        payload: data,
        scope: range,
    }
}

/**
 * fetch this week records action
 */
export const fetchBookingRecordAction = (range) => {
    return (dispatch, getState) => {
        dispatch(fetchRecordRequestSent(range))
        api.fetchBookingRecord(range)
            .then(response => {
                if (response.status !== 200) {
                    dispatch(fetchRecordFailed(response.statusText))
                } else {
                    return response.json()
                        .then(result => {
                            dispatch(fetchRecordSuccess(result, range))
                        })
                        .catch(e => {
                            console.log(e)
                        })
                }
            }).catch(e => {
                console.log(e);
            })
    }
}

export const selectRecordAction = (uuid) => {
    return {
        type: 'E_RECORD_SELECTED',
        uuid: uuid,
    }
}

export const showCommentsAction = (payload) => {
    return {
        type: 'A_SHOW_COMMENTS',
        payload
    }
}

export const closeCommentsAction = () => {
    return {
        type: 'A_CLOSE_COMMENTS',
    }
}

/**
 * user select a action
 */

export const menuItemSelectedAction = (menuIndex) => {
    return (dispatch, getState) => {
        const uuid = getState().dashboardReducer.currentRecordUUID
        const range = getState().uiReducer.currentIndex === 1 ? '4' : '-3'
        //set clean status
        if (menuIndex === 0 || menuIndex === 1 || menuIndex === 2) {
            let cleanStatus = ''
            switch (menuIndex) {
                case 0:
                    cleanStatus = 'cleaned'
                    break
                case 1:
                    cleanStatus = 'processing'
                    break
                default:
                    cleanStatus = 'N/A'
            }
            api.setClean(uuid, cleanStatus)
                .then(response => {
                    if (response.status !== 200) {
                        dispatch(fetchRecordFailed(response.statusText))
                    } else {
                        return response.json()
                            .then(result => {
                                dispatch(fetchBookingRecordAction(range))
                            }).catch(e => {
                                console.log(e)
                            })
                    }
                }).catch(e => {
                    console.log(e);
                })
        } else if (menuIndex === 3) {  //set checkout time
            dispatch(openCheckoutsAction())
        }
        else {  //comments
            const records = getState().uiReducer.currentIndex === 0 ?
                getState().dashboardReducer.bookingRecordThisWeek :
                getState().dashboardReducer.bookingRecordNextWeek
            const payload = UTIL.getRecordByUUID(uuid, records)
            dispatch(showCommentsAction(payload))
        }
    }
}

export const setCommentorAction = (payload) => {
    return {
        type: 'A_SET_COMMENTOR',
        payload
    }
}

export const commentChangeAction = (payload) => {
    return {
        type: 'E_COMMENT_CHANGE',
        payload
    }
}

export const submitNewCommentAction = () => {
    return (dispatch, getState) => {
        const record = getState().uiReducer.dialogRecord
        const newComment = getState().uiReducer.newComment
        const range = getState().uiReducer.currentIndex === 1 ? '4' : '-3'
        if (newComment.length > 2) {
            api.addNewComment(record.UUID, newComment, record.Operation)
                .then(
                response => {
                    if (response.status !== 200) {
                        dispatch(fetchRecordFailed(response.statusText))
                    } else {
                        return response.json()
                            .then(result => {
                                console.log(result)
                                dispatch(fetchBookingRecordAction(range))
                                dispatch(closeCommentsAction())
                            }).catch(e => {
                                console.log(e)
                            })
                    }
                }
                ).catch(e => {
                    console.log(e);
                })
        } else {
            dispatch(closeCommentsAction())
        }
    }
}

export const setCheckoutHourAction = (payload) => {
    return {
        type: 'E_CHECKOUT_HOUR',
        payload
    }
}

export const setCheckoutAMPMAction = (payload) => {
    return {
        type: 'E_CHECKOUT_AMPM',
        payload
    }
}

export const closeCheckoutsAction = () => {
    return {
        type: 'E_CHECKOUT_CLOSE',
    }
}

export const openCheckoutsAction = () => {
    return {
        type: 'E_CHECKOUT_OPEN',
    }
}